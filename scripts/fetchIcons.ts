import dd from "dedent";
import degit from "degit";
import { rollup } from "rollup";
import { join, parse } from "path";
import { camelCase } from "change-case";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { readdir, readFile, outputFile, remove, removeSync } from "fs-extra";

import pkg from "../package.json";

const TMP = join(process.cwd(), "tmp");

const SOLID_SRC = "tailwindlabs/heroicons/optimized/solid";
const SOLID_DIST = join(TMP, "solid");

const OUTLINE_SRC = "tailwindlabs/heroicons/optimized/outline";
const OUTLINE_DIST = join(TMP, "outline");

// Start the whole machinery
main().catch((e) => {
  console.error(e);
  process.exit(1);
});

async function main() {
  // Remove previous artifact
  removeSync(SOLID_DIST);
  removeSync(OUTLINE_DIST);

  // Clone the original SVG icons from the repo.
  const [solidGit, outlineGit] = [SOLID_SRC, OUTLINE_SRC].map((repo) =>
    degit(repo, { cache: false, verbose: true, force: true })
  );

  await solidGit.clone(SOLID_DIST);
  await outlineGit.clone(OUTLINE_DIST);

  // Generate the icons in the proper folder
  await generateIcons({
    path: SOLID_DIST,
    name: "solid",
    outline: false,
  });
  await generateIcons({
    path: OUTLINE_DIST,
    name: "outline",
    outline: true,
  });

  // Remove temporary git clones folder
  await remove(TMP);
}

async function generateIcons({ path, name, outline }) {
  const icons = await readdir(path);
  const exportedIcons: string[] = [];
  const exportedTypes: string[] = [];

  for (const icon of icons) {
    const iconName = camelCase(parse(icon).name);
    const iconSVG = await readFile(join(path, icon), { encoding: "utf-8" });

    // Clean the SVG markup
    const cleanedSVG = iconSVG
      .split("\n")
      .filter(Boolean)
      .map((path) => path.replace(/fill="(#\w+)"/g, 'fill="transparent"'));
    cleanedSVG.shift();
    cleanedSVG.pop();

    const code = cleanedSVG.join(" ").replace(/\s{2,}/g, "");
    const iconPathsStr = dd`export const ${iconName} = { path: () => <>${code}</>, outline: ${outline} };`;
    const iconTypeStr = dd`export declare const ${iconName}: { path: () => Element | Element[] | string; outline: boolean; };`;
    exportedIcons.push(iconPathsStr);
    exportedTypes.push(iconTypeStr);
  }

  const exportedIconsStr = exportedIcons.join("\n");
  const exportedTypesStr = exportedTypes.join("\n");
  await outputFile(join(process.cwd(), name, `index.jsx`), exportedIconsStr, {
    encoding: "utf-8",
  });
  await outputFile(join(process.cwd(), name, "index.d.ts"), exportedTypesStr, {
    encoding: "utf-8",
  });
  await outputFile(
    join(process.cwd(), name, "package.json"),
    dd`
      {
        "name": "solid-heroicons/${name}",
				"type": "module",
        "module": "browser/index.js",
        "main": "browser/index.js",
        "types": "index.d.ts",
				"peerDependencies": {
					"solid-js": "${pkg.peerDependencies["solid-js"]}"
				},
				"dependencies": {
					"solid-js": "${pkg.dependencies["solid-js"]}"
				},
				"exports": {
					".": {
						"solid": "./index.jsx",
					  "node": "./server/index.js",
					  "default": "./browser/index.js"
					}
				},
        "sideEffects": false
      }`
  );

  const extensions = [".js", ".ts", ".jsx", ".tsx"];

  const build = (ssr = false) =>
    rollup({
      input: join(process.cwd(), name, `index.jsx`),
      external: ["solid-js", "solid-js/web", "solid-js/store"],
      plugins: [
        babel({
          extensions,
          babelHelpers: "bundled",
          presets: [
            ["babel-preset-solid", { generate: ssr ? "ssr" : "dom" }],
            ["@babel/preset-env", { bugfixes: true, targets: "last 2 years" }],
          ],
        }),
        nodeResolve({ extensions }),
      ],
    });

  const browser = join(process.cwd(), name, `browser`);
  const server = join(process.cwd(), name, `server`);

  const ssr = await build(true);
  ssr.write({
    file: join(server, `index.js`),
    format: "esm",
  });

  const noSsr = await build(false);
  noSsr.write({
    file: join(browser, `index.js`),
    format: "esm",
  });
}

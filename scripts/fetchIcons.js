import { join, parse } from "path";
import { readdir, readFile, outputFile, remove } from "fs-extra";
import { camelCase } from "change-case";
import dd from "dedent";
import degit from "degit";

const TMP = join(process.cwd(), "tmp");
const SOLID_SRC = "tailwindlabs/heroicons/solid";
const SOLID_DIST = join(TMP, "solid");
const OUTLINE_SRC = "tailwindlabs/heroicons/outline";
const OUTLINE_DIST = join(TMP, "outline");

async function main() {
  const [solidGit, outlineGit] = [SOLID_SRC, OUTLINE_SRC].map((repo) =>
    degit(repo, { cache: false, verbose: true, force: true })
  );
  await solidGit.clone(SOLID_DIST);
  await outlineGit.clone(OUTLINE_DIST);

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
  await remove(TMP);
}

async function generateIcons({ path, name, outline }) {
  const icons = await readdir(path);
  const exportedIcons = [];
  const exportedTypes = [];

  for (const icon of icons) {
    const iconName = camelCase(parse(icon).name);
    const iconSVG = await readFile(join(path, icon), { encoding: "utf-8" });
    const cleanedSVG = iconSVG.split("\n").filter(Boolean);
    cleanedSVG.shift();
    cleanedSVG.pop();

    const code = cleanedSVG.join(" ").replace(/\s{2,}/g, "");
    const iconPathsStr = dd`export const ${iconName} = { path: \`${code}\`, outline: ${outline} };`;
    const iconTypeStr = dd`export declare const ${iconName}: { path: string; outline: boolean; };`;
    exportedIcons.push(iconPathsStr);
    exportedTypes.push(iconTypeStr);
  }

  const exportedIconsStr = exportedIcons.join("\n");
  const exportedTypesStr = exportedTypes.join("\n");
  await outputFile(join(process.cwd(), name, "index.js"), exportedIconsStr, {
    encoding: "utf-8",
  });
  await outputFile(join(process.cwd(), name, "index.d.ts"), exportedTypesStr, {
    encoding: "utf-8",
  });
  await outputFile(
    join(process.cwd(), name, "package.json"),
    dd`
        {
            "name": "@amoutonbrady/solid-heroicons/${name}",
            "main": "index.js",
            "module": "index.js",
            "types": "index.d.ts",
            "sideEffects": false
        }`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

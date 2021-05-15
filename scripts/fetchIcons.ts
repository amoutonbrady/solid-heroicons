import dd from "dedent";
import degit from "degit";
import { join, parse } from "path";
import { camelCase } from "change-case";
import { readdir, readFile, outputFile, remove, removeSync } from "fs-extra";

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
	await generateIcons({ path: SOLID_DIST, name: "solid", outline: false });
	await generateIcons({ path: OUTLINE_DIST, name: "outline", outline: true });

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
				"type": "module",
        "module": "index.js",
        "main": "index.js",
        "types": "index.d.ts",
				"exports": {
					".": {
					  "default": "./index.js"
					} 
				},
        "sideEffects": false
      }`
	);
}

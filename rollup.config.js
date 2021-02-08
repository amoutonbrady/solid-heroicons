import del from "rollup-plugin-delete";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const extensions = [".ts", ".tsx", ".js"];

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/icon.tsx",
  output: [
    { dir: "dist/cjs", format: "cjs", sourcemap: true },
    { dir: "dist/esm", format: "esm", sourcemap: true },
  ],
  plugins: [
    del({ targets: ["dist/*"] }),
    nodeResolve({ extensions, browser: true }),
    babel({
      babelHelpers: "bundled",
      extensions,
      presets: ["@babel/preset-typescript", "babel-preset-solid"],
    }),
  ],
  external: ["solid-js", "solid-js/web"],
};

export default config;

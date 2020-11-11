import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import pkg from "./package.json";
import del from "rollup-plugin-delete";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/icon.tsx",
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" },
    { file: pkg.module, format: "module", plugins: [terser()] },
  ],
  plugins: [
    del({ targets: ["dist/*"] }),
    nodeResolve({
      extensions: [".ts", ".tsx"],
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".ts", ".tsx"],
      presets: ["@babel/preset-typescript", "babel-preset-solid"],
    }),
  ],
  external: ["solid-js", "solid-js/dom"],
};

export default config;

import withRollup from "rollup-preset-solid";

export default withRollup([
  { input: "src/icon.tsx", mappingName: "browser" },
  {
    input: "src/icon.tsx",
    mappingName: "server",
    solidOptions: { generate: "ssr", hydratable: false },
  },
]);

import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: [
    { file: "dist/index.js", format: "es", exports: "named" },
    { file: "dist/index.cjs", format: "cjs", exports: "named" },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      clean: true,
    }),
  ],
};

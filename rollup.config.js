import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: "ui/src/player.ts",
    output: {
      file: "static/player.js",
      format: "iife",
    },
    plugins: [nodeResolve(), typescript(), uglify()],
  },
];

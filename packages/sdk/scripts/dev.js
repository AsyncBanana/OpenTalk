import { build } from "esbuild";
build({
	entryPoints: ["src/index.ts"],
	outfile: "dist/index.js",
	minify: false,
	watch: true,
	sourcemap: true,
});

import { buildSync } from "esbuild";
import { writeFileSync } from "fs";
let { metafile } = buildSync({
	entryPoints: ["src/index.ts"],
	outfile: "dist/index.js",
	minify: true,
	watch: false,
	sourcemap: true,
	metafile: true,
});
writeFileSync("build-data.json", JSON.stringify(metafile));

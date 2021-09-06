import execa from "execa";
import proxyPackage from "http-proxy";
import { createServer } from "http";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
execa("wrangler", ["dev"], {
	cwd: __dirname + "/../api",
}).stdout.pipe(process.stdout);
execa("pnpm", ["dev"], {
	cwd: __dirname + "/../core",
}).stdout.pipe(process.stdout);
const proxy = proxyPackage.createProxyServer({
	ws: true,
	hostRewrite: true,
	autoRewrite: true,
});
const server = createServer((req, res) => {
	if (req.url.match("/api")) {
		proxy.web(req, res, { target: "http://localhost:8787" });
	} else {
		proxy.web(req, res, { target: "http://localhost:2999" });
	}
});
server.listen(3000);

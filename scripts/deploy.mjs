// Publica em laroca.dev: build com BASE=/ e envio do Worker.
import { execSync } from "node:child_process";
const run = (c, env = {}) => execSync(c, { stdio: "inherit", env: { ...process.env, ...env } });
run("pnpm build", { BASE: "/" });
run("npx wrangler deploy");

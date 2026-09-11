# BUILD STATUS

## 已完成的静态检查

- `package.json` 中直接依赖均使用精确版本。
- `packageManager` 固定为 `pnpm@11.13.1`。
- `.node-version` 与 `engines.node` 固定为 `24.21.0`。
- `pnpm-workspace.yaml` 由 pnpm 11 自动生成，仅用于声明 `allowBuilds: esbuild / workerd`（pnpm 10+ 默认拦截依赖的构建脚本，需显式允许）。
- Astro `site` 只在 `astro.config.mjs` 一处配置，并允许为空。
- sitemap 仅在 `site` 非空时启用。
- Google Maps iframe 已由中文区域参数改为 `es / py`。
- 项目源码 grep 未发现 `example.com`、`localhost`、`chrome-extension://`。
- 未手写 sitemap URL 或 `lastmod`。

## 已修复的两处构建阻塞（2026-09-11）

### 1. `pnpm-lock.yaml` 残缺导致依赖安装失败

现象：CI 报 `ERR_PNPM_LOCKFILE_MISSING_DEPENDENCY: no entry for '@astrojs/cloudflare@14.3.1' in pnpm-lock.yaml`。

原因：旧锁文件只写了 `importers:` 段（精确的直接依赖），缺少 `packages:` 与 `snapshots:` 解析段，无法用于 `--frozen-lockfile`。

修复：删除旧锁文件后联网重新解析生成完整锁文件：

```bash
pnpm install --lockfile-only   # 解析 486 个包，写入完整 packages/snapshots
pnpm install --frozen-lockfile # 验证：Lockfile is up to date，315 包安装通过
```

### 2. `wrangler.toml` 的 `main` 指向构建产物导致 `astro build` 失败

现象：CI 报 `The provided Wrangler config main field (.../dist/_worker.js/index.js) doesn't point to an existing file`。

原因：`@astrojs/cloudflare` v13+（本项目为 14.3.1）改用 Cloudflare Vite 插件，`@cloudflare/vite-plugin` 会在 Vite 配置解析阶段（早于构建）校验 `main` 指向的文件是否存在，而 `dist/_worker.js/index.js` 是构建产物 → 死锁。

修复：`wrangler.toml` 的 `main` 改为适配器提供的入口 `@astrojs/cloudflare/entrypoints/server`（该包确实导出 `./entrypoints/server` → `dist/entrypoints/server.js`）。

```toml
name = "playa-san-jose-encarnacion"
main = "@astrojs/cloudflare/entrypoints/server"
compatibility_date = "2026-09-11"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = "./dist"
binding = "ASSETS"
```

补充说明：`astro build` 现在输出 `dist/client`（静态资源）与 `dist/server`（`entry.mjs` + 由适配器生成的 `wrangler.json`），并写出 `.wrangler/deploy/config.json` 指向 `dist/server/wrangler.json`；因此从仓库根执行 `wrangler deploy` 会自动改用构建产物配置（`main: entry.mjs`、`assets.directory: ../client`），无需手工传 `--config`。

## 本地验证结果（2026-09-11）

- `pnpm install --frozen-lockfile`：通过
- `pnpm build`：通过（Server built in 10.39s，Complete!）
- `npx wrangler deploy --dry-run`：通过（打包 16 个模块 / 643.17 KiB，读取 `dist/client` 下 19 个资源，绑定 SESSION / IMAGES / ASSETS）

## 仍未完成

- 尚未在真实 Cloudflare 环境执行一次完整 `wrangler deploy`（dry-run 已本地验证）。
- `astro check` 尚未重跑。

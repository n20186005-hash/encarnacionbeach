# BUILD STATUS

## 已完成的静态检查

- `package.json` 中直接依赖均使用精确版本。
- `packageManager` 固定为 `pnpm@11.13.1`。
- `.node-version` 与 `engines.node` 固定为 `24.21.0`。
- 未创建 `pnpm-workspace.yaml`（单包项目不需要）。
- Astro `site` 只在 `astro.config.mjs` 一处配置，并允许为空。
- sitemap 仅在 `site` 非空时启用。
- Google Maps iframe 已由中文区域参数改为 `es / py`。
- 项目源码 grep 未发现 `example.com`、`localhost`、`chrome-extension://`。
- 未手写 sitemap URL 或 `lastmod`。

## 当前执行环境限制

此会话的容器没有可用的外网包管理网络，Corepack 无法连接 npm registry；同一限制也阻止了 Wikimedia JPG 二进制下载。因此这里无法诚实地声明已在“删掉 node_modules 的干净环境”完成 `pnpm install --frozen-lockfile -> pnpm check -> pnpm build`。

同时，由于无法访问 registry 生成完整依赖图，当前 `pnpm-lock.yaml` 只记录了精确的直接依赖 importer，并不是可用于 `--frozen-lockfile` 的完整解析锁文件。首次在联网开发环境中应运行一次 `corepack pnpm install` 生成完整锁文件，然后提交该锁文件，再执行要求的 frozen-lockfile 检查。

本文件明确记录这一限制，是为了避免把未实际通过的构建冒充为已通过。

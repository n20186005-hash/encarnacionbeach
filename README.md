# Playa San José · Encarnación

为巴拉圭恩卡纳西翁 Playa San José 制作的西班牙语单页景点站。视觉以 Paraná 河、沙色、河水蓝绿和日落橙为核心，不使用通用旅游模板。

## 技术栈

- Astro 7.3.2
- Tailwind CSS 4.3.3（`@tailwindcss/vite`）
- TypeScript 6.0.3
- `@astrojs/check` 0.9.10
- `@astrojs/cloudflare` 14.3.1
- `@astrojs/sitemap` 3.7.4
- Wrangler 4.130.0
- pnpm 11.13.1
- Node.js 24.21.0

所有 `package.json` 依赖均为精确版本，无 `latest`、`*`、`^`、`~`。

## 域名只配置一次

打开 `astro.config.mjs`：

```js
const SITE = '';
```

域名确定后只修改这一处，例如填入 `https://your-domain.tld`。当 `SITE` 为空时：

- 项目仍可正常设计为可构建状态；
- canonical 与 `og:url` 自动省略；
- Open Graph 图片允许使用相对/现有资源；
- `@astrojs/sitemap` 不启用，因此不会生成带占位域名的 sitemap。

填入真实域名后重新构建即可启用 sitemap，URL 统一从 Astro `site` 派生。

## 本地开发

```bash
corepack enable
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm dev
```

## Cloudflare Workers

`wrangler.toml` 已包含 Worker 入口、静态资源目录和 `nodejs_compat`。部署：

```bash
pnpm deploy
```

首次部署前请根据自己的 Cloudflare 账户修改 Worker 名称（若需要）。

## 页面包含

- Playa San José 主题 Hero
- 费用 / 入口
- 停车信息
- 最佳游览时段与建议停留时长
- 详细交通
- 周边美食
- 周边景点
- 西班牙语 Google Maps 嵌入
- FAQ
- TouristAttraction + LocalBusiness JSON-LD
- FAQPage JSON-LD
- GA4 `G-HXM22WWPKP`
- Logo、SVG favicon、16/32/180 PNG favicon
- 隐私 / 条款 / Cookie 文档

## 照片说明

站点选用的是 Playa San José 的真实 Wikimedia Commons 实景照片，并在 `IMAGE-SOURCES.md` 写明文件名、原图链接、作者和许可证。

**本次执行环境阻止了外部二进制文件下载，所以四张实景照片的 JPG 二进制无法在这里写入 ZIP。** 为避免拿 AI 生成图冒充实景图，页面暂时直接使用这些真实 Wikimedia 原图 URL。Logo 与 favicon 则已完整本地化进项目。

如果要做到 100% 无图片外链，请按 `IMAGE-SOURCES.md` 的原图地址保存为指定文件名，再把 `src/pages/index.astro` 顶部 `photos` 对象改成 `/images/...` 路径。

## 信息来源

内容优先参考：

- Municipalidad de Encarnación — Playa San José
- Municipalidad de Encarnación — Playas y Costaneras
- Municipalidad de Encarnación — Centros de Información Turística
- Visit Paraguay / SENATUR
- 用户提供的 Google Maps 条目、评分、地址与嵌入代码

## 域名候选

- `playasanjosepy.com`
- `sanjoseencarnacion.com`
- `playasanjoseencarnacion.com`
- `costanerajose.com`
- `playadelparana.com`

域名注册状态变化很快，实际购买前请在注册商处再次确认实时可用性。

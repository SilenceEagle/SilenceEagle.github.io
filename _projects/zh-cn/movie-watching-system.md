---
page_id: movie_watching_system
layout: project-doc
title: 观影系统
last_modified_at: "2026-11-16"
description: 跨设备观影进度同步，资源自动订阅。
img: assets/media/movie-watching-system/thumbnail.webp
importance: 2
category: fun
toc:
    sidebar: left
---

<img class="project-doc-image" src="{{ '/assets/media/movie-watching-system/cover.webp' | relative_url }}" width="1152" height="648" alt="电视、笔记本电脑和手机正在播放同一段山间木屋画面">

## 目标

在手机上看到一半，回到客厅可以从电视接着看。想追的电影或剧集只需添加一次订阅，匹配到资源后，系统会下载、整理并更新媒体库。

## 跨平台观影

### 服务端部署

我用 **Emby** 管理媒体库和播放进度。服务端可以用 Docker 部署，挂载影视目录后，在后台添加对应的媒体库。各设备登录同一台服务器的同一个用户账号，即可在首页的「继续观看」里找到上次看到的位置。见 [Emby 服务端部署文档](https://emby.media/support/articles/Linux.html)。

- **独立用户进度**。家人可以各用自己的账号，按需接入 [jfa-go](https://github.com/hrfee/jfa-go) 发送注册邀请。
- **硬件加速**。服务端需要转码时，可用兼容的硬件减轻 CPU 负担。见 [Emby 硬件加速说明](https://emby.media/support/articles/Hardware-Acceleration-Overview.html)。
- **插件扩展**。可按需安装插件，扩展媒体库管理等功能。
- **社区活跃**。公开的自定义支持丰富，目前推荐使用[Mediawarp](https://github.com/AkimioJR/MediaWarp)。

### 各平台客户端

| 平台 | 客户端与使用说明 |
| --- | --- |
| Windows / macOS | 用浏览器打开 Emby 服务地址即可播放。 |
| iOS | [Emby](https://emby.media/emby-for-ios.html) 是官方客户端，完整播放可一次性解锁或使用 Premiere。[iemc](https://apps.apple.com/cn/app/iemc/id1467462861) 是支持 DLNA 投屏的第三方播放器。 |
| Android | [Emby for Android](https://emby.media/emby-for-android.html) 是官方客户端，手机端完整播放可解锁或使用 Premiere。 |
| Android TV | [Emby for Android TV](https://emby.media/emby-for-android-tv.html) 支持最多 5 台电视设备免费播放。也可用免费开源的 [Kodi](https://kodi.tv/) 搭配 [Emby for Kodi Next Gen](https://emby.media/community/forum/185-emby-for-kodi-next-gen/)，适合有蓝光原盘播放需求的场景。 |
{: .project-doc-table }

截至 2026 年 11 月，中国大陆 App Store 的 [Emby 播放解锁](https://apps.apple.com/cn/app/emby/id992180193)为 ¥38，iemc 为 ¥18。各平台的免费播放范围见 [Emby 官方功能对照表](https://emby.media/support/articles/Premiere-Feature-Matrix.html)。

## 资源自动订阅

> **前提条件**　需要可用的 PT 站点账号，并为下载和媒体库预留足够的硬盘空间与带宽。

1. **订阅**。在 [MoviePilot](https://github.com/jxxghp/MoviePilot) 中添加想看的电影或剧集，由它匹配符合条件的资源。
2. **下载**。MoviePilot 将任务交给 [qBittorrent](https://www.qbittorrent.org/) 或 [Transmission](https://transmissionbt.com/)。
3. **整理**。下载完成后，MoviePilot 按媒体库规则重命名文件，将影片归入对应目录。
4. **入库**。Emby 扫描整理后的目录，影片出现在各设备共用的媒体库中。

部署时，让 MoviePilot 能读取下载目录并写入媒体目录，再把 Emby 的媒体库指向整理后的目录。

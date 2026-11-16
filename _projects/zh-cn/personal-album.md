---
page_id: personal_album
layout: project-doc
title: 个人相册
last_modified_at: "2026-11-16"
description: 自建本地相册，并配置照片内容搜索。
img: assets/media/personal-album/cover.webp
importance: 3
category: fun
toc:
    sidebar: left
---

<img class="project-doc-image" src="{{ page.img | relative_url }}" width="1280" height="720" alt="夕阳照在摊开的照片册上，桌上摆着家用 NAS 和一张猫的照片">

## 目标

在家里的电脑或 NAS 上搭建个人相册，把照片原件存放在自己的磁盘上，搜索也由本机模型处理。照片留在自己的设备上，无需上传给第三方训练模型。

## 相册工具选择

我先后试过 QuMagie 和 PhotoPrism，目前使用 Immich。

| 相册工具 | 实际使用感受 |
| --- | --- |
| [QuMagie](https://www.qnap.com.cn/zh-cn/software/qumagie) | QNAP 自带的相册。我使用时没有满足多用户需求，人脸识别数据也曾多次丢失。 |
| [PhotoPrism](https://www.photoprism.org/) | 整体体验一般，多用户支持也没有达到预期。 |
| [Immich](https://immich.app/) | 支持多用户、本地 AI 搜索和外部图库，也有官方手机应用。 |
{: .project-doc-table }

## 部署 Immich

以下以安装了 Docker Compose 的 Linux 主机为例。

1. **准备部署文件。** 新建部署目录，从同一个发行版本下载 `docker-compose.yml` 和 `example.env`，将 `example.env` 改名为 `.env`。下载地址见 [Immich 安装文档](https://docs.immich.app/install/docker-compose/)。
2. **配置存储。** 编辑 `.env`，把照片和数据库目录换成自己的路径，并为 `DB_PASSWORD` 设置随机密码。

    ```dotenv
    UPLOAD_LOCATION=/srv/immich/library
    DB_DATA_LOCATION=/srv/immich/postgres
    TZ=Asia/Shanghai
    ```

    `UPLOAD_LOCATION` 存放上传的照片、视频和生成的文件。`DB_DATA_LOCATION` 存放 PostgreSQL 数据，应使用主机本地磁盘。

3. **启动服务。** 在部署目录启动容器，并检查状态。

    ```bash
    docker compose up -d
    docker compose ps
    ```

    容器就绪后，用浏览器打开 `http://<主机局域网地址>:2283`，创建管理员账号。

## 导入照片

### 从手机或浏览器导入

在网页上传照片，或用手机端连接局域网地址，选择要备份的相册。上传的原件写入主机上的 `UPLOAD_LOCATION`。

### 接入已有照片目录

在 `immich-server` 的 `volumes` 下添加下面这一项，并与已有挂载对齐。`:ro` 让 Immich 以只读方式访问原件。

```yaml
- /mnt/photos:/mnt/photo-library:ro
```

重新运行 `docker compose up -d`，在「管理 → 外部图库」中创建图库，添加容器内路径 `/mnt/photo-library` 并扫描。见 [外部图库配置](https://docs.immich.app/guides/external-library/)。

## 配置本地 AI 搜图

### 选择中文搜索模型

1. 进入「管理 → 设置 → 机器学习 → 智能搜索」。使用 Compose 自带的模型服务 `http://immich-machine-learning:3003`，在同一台主机处理照片和搜索词。
2. 将模型名称设为 [immich-app/XLM-Roberta-Large-Vit-B-16Plus](https://huggingface.co/immich-app/XLM-Roberta-Large-Vit-B-16Plus) 并保存（参考了[这里](https://github.com/immich-app/immich/discussions/11862)）。这个多语言模型支持中文查询，首次使用时需要下载权重。

<details markdown="block">
<summary markdown="span">下载较慢时，手动放置模型文件</summary>

自动下载速度较慢时，可以手动下载模型，再把模型目录放到 `immich-machine-learning` 服务的 `cache/clip` 下。

<figure>
    <a href="{{ '/assets/media/personal-album/immich-ml-model-path.png' | relative_url }}">
        <img class="project-doc-image" src="{{ '/assets/media/personal-album/immich-ml-model-path.png' | relative_url }}" width="880" height="994" loading="lazy" alt="文件管理器中展开的 cache/clip 目录，显示模型的 config.json、textual 和 visual 子目录">
    </a>
    <figcaption class="caption">模型目录在 cache/clip 下，内含文字和图像编码所需的文件。</figcaption>
</figure>

</details>

### 建立索引并搜索

1. 如果图库已有照片，在「管理 → 任务队列」中对「智能搜索」运行「全部」，等待索引完成。新导入的照片会自动进入处理队列。
2. 在搜索框选择「内容（Contextual）」，输入一段画面描述。可以用几张内容差异明显的照片验证，例如搜「雪山脚下的木屋」。

模型会分别把照片和搜索词转成向量，Immich 用两者的相似度找出相关照片。更换模型后，对已有照片重新运行一次完整索引。见 [智能搜索和模型配置](https://docs.immich.app/features/searching/)。

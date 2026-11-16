---
page_id: easy_bookkeeping
layout: project-doc
title: 便捷记账
last_modified_at: "2026-11-16"
description: 自动识别账单明细并记录
img: assets/media/bookdeeping/custom-firefly.jpg
importance: 1
category: fun
toc:
    sidebar: left
---

## 目标

在手机上完成一笔收支后，通过 OCR 识别交易截图中的文字，并提交大模型解析交易字段明细，确认明细后记入自己的云端服务器。

## 最终效果

从账单截图提取明细后，快捷指令会打开确认页。核对并提交后，页面显示记账成功。

<div class="project-doc-demo">
  <video class="project-doc-video" controls playsinline preload="none" width="780" height="1688" aria-label="便捷记账操作演示" poster="{{ '/assets/media/bookdeeping/easy-bookkeeping-demo-poster.jpg' | relative_url }}">
    <source src="{{ '/assets/media/bookdeeping/easy-bookkeeping-demo.mp4' | relative_url }}" type="video/mp4">
    <a href="{{ '/assets/media/bookdeeping/easy-bookkeeping-demo.mp4' | relative_url }}">查看记账演示视频</a>
  </video>
  <figure>
    <a href="{{ '/assets/media/bookdeeping/firefly-transaction-result.webp' | relative_url }}">
      <img class="project-doc-image" src="{{ '/assets/media/bookdeeping/firefly-transaction-result.webp' | relative_url }}" width="1665" height="921" loading="lazy" alt="Firefly III 交易详情页，显示已记录的电费支出、支付账户和分类">
    </a>
    <figcaption class="caption">Firefly III 中已保存的交易详情</figcaption>
  </figure>
</div>

## 前提条件

- 支持运行快捷指令的 iPhone。
- 一台可从外网访问的支持docker自有服务器。
- 用于从 OCR 文本中提取交易明细的 DeepSeek API 密钥。


## 实现思路

1. **iPhone 快捷指令**截取交易页面，通过 OCR 提取文字，然后发送给自建的 `expense_api` 服务。
2. **`expense_api` 服务**调用 DeepSeek API 提取交易明细，生成确认页面，并把网址返回给快捷指令。
3. **快捷指令**在浏览器中打开确认页面。用户可以修改明细，确认后交易会写入 `Firefly III`。

## 部署流程

### 1. 部署 [Firefly III](https://www.firefly-iii.org/) 记账服务

<details markdown="block">
<summary markdown="span">展开 Firefly III 的 Docker Compose 配置</summary>


```yaml
services:
  app:
    image: fireflyiii/core:latest
    hostname: app
    container_name: firefly_iii_core
    restart: always
    volumes:
      - /{somepath}/firefly_iii/firefly_iii_upload:/var/www/html/storage/upload
    ports:
      - 8080:8080
    depends_on:
      - db
    environment:
      # You can leave this on "local". If you change it to production
      # most console commands will ask for extra confirmation.
      - APP_ENV=production

      # Set to true if you want to see debug information.
      - APP_DEBUG=false

      # Administrator email address
      - SITE_OWNER=xxx@example.com

      # Encryption key, exactly 32 characters
      # head /dev/urandom | LC_ALL=C tr -dc 'A-Za-z0-9' | head -c 32 && echo
      - APP_KEY=xxxxxxxxxxxxxxxxx

      # Language settings
      - DEFAULT_LANGUAGE=zh_CN
      - DEFAULT_LOCALE=zh_CN

      # Timezone
      - TZ=Asia/Shanghai

      # Logging
      - LOG_CHANNEL=stack
      - APP_LOG_LEVEL=notice
      - AUDIT_LOG_LEVEL=emergency

      # Database settings
      - DB_CONNECTION=mysql
      - DB_HOST=192.168.xx.xx
      - DB_PORT=3306
      - DB_DATABASE=firefly
      - DB_USERNAME=firefly
      - DB_PASSWORD=fireflyDb,.

      # MYSQL_USE_SSL=false
      -  MYSQL_SSL_VERIFY_SERVER_CERT=true
      # You need to set at least of these options
      - MYSQL_SSL_CAPATH=/etc/ssl/certs/
      - MYSQL_SSL_CA=
      - MYSQL_SSL_CERT=
      - MYSQL_SSL_KEY=
      - MYSQL_SSL_CIPHER=

      # Cache & Session
      - CACHE_DRIVER=file
      - SESSION_DRIVER=file

      # Authentication
      - AUTHENTICATION_GUARD=web

      # Cron token (must be exactly 32 characters)
      - STATIC_CRON_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx

      # Public URL of Firefly III
      - APP_URL="https://xxxxxx.xx.xx.xx:8080"
      - TRUSTED_PROXIES=**
      # Cookie settings. Should not be necessary to change these.
      # If you use Docker or similar, you can set   COOKIE_DOMAIN_FILE to set
      # the value from a file instead of from an environment variable
      # Setting samesite to "strict" may give you trouble logging in.
      - COOKIE_PATH="/"
      - COOKIE_DOMAIN=
      - COOKIE_SECURE=false
      - COOKIE_SAMESITE=lax

      # The map will default to this location:
      - MAP_DEFAULT_LAT=51.983333
      - MAP_DEFAULT_LONG=5.916667
      - MAP_DEFAULT_ZOOM=6

      - DISABLE_FRAME_HEADER=false
      - DISABLE_CSP_HEADER=false

      # Leave the following configuration vars as is.
      # Unless you like to tinker and know what you're doing.
      - APP_NAME=FireflyIII
      - BROADCAST_DRIVER=log
      - QUEUE_DRIVER=sync
      - CACHE_PREFIX=firefly
      - PUSHER_KEY=
      - IPINFO_TOKEN=
      - PUSHER_SECRET=
      - PUSHER_ID=
      - DEMO_USERNAME=
      - DEMO_PASSWORD=

      # The v2 layout is very experimental. If it breaks you get to keep both parts.
      # Be wary of data loss.
      - FIREFLY_III_LAYOUT=v1
  db:
    image: mariadb:lts
    hostname: db
    container_name: firefly_iii_db
    restart: always
    ports:
      - "3306:3306"
    volumes:
      - /{somepath}/firefly_iii/firefly_iii_db:/var/lib/mysql
    environment:
      - MYSQL_RANDOM_ROOT_PASSWORD=yes
      - MYSQL_USER=firefly
      - MYSQL_PASSWORD=fireflyDb,.
      - MYSQL_DATABASE=firefly
  cron:
    #
    # To make this work, set STATIC_CRON_TOKEN in your .env file or as an environment variable
    # The STATIC_CRON_TOKEN must be *exactly* 32 characters long
    # Use this URL for inspiration: https://www.random.org/strings/?num=1&len=32&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new
    #
    image: alpine
    restart: always
    container_name: firefly_iii_cron
    command: ["sh", "-c", "apk add tzdata && \
      (ln -s /usr/share/zoneinfo/$$TZ /etc/localtime || true) && \
      echo \"0 3 * * * wget -qO- http://xxxx:8080/api/v1/cron/$$STATIC_CRON_TOKEN;echo\" \
      | crontab - && \
      crond -f -L /dev/stdout"]
    network_mode: "bridge"
    depends_on:
      - app
    environment:
      # Cron token (must be exactly 32 characters)
      - STATIC_CRON_TOKEN=xxxxxxxxxxxxxxxxxxxxxx

volumes:
   firefly_iii_upload:
   firefly_iii_db:


```

</details>


> **部署提示**：修改配置中的令牌和网址，并确认各服务之间网络互通。


启动容器后，在浏览器中访问 `https://xxxxxx.xx.xx.xx:8080`，按提示完成初始化。


### 2. 部署 `expense-api` 记账解析服务

#### 创建个人访问令牌

在 Firefly III 的「远程访问与令牌」中创建并记录个人访问令牌。

<img class="project-doc-image" src="{{ '/assets/media/bookdeeping/firefly_personal_token.webp' | relative_url }}" width="1487" height="429" loading="lazy" alt="Firefly III 的个人访问令牌创建界面">

#### 获取代码并构建镜像

从远程仓库拉取最新的 `expense-api` 代码。

```bash
git clone https://github.com/SilenceEagle/firefly_iii_expense_api.git
```

构建 `expense-api` 镜像。
```bash
cd firefly_iii_expense_api
# 构建时注入版本信息：
docker build \
--build-arg BUILD_DATE="$(date +%Y-%m-%d)" \
--build-arg GIT_COMMIT="$(git rev-parse --short HEAD)" \
-t expense-api .
```

#### 添加服务配置

将以下配置添加到 Firefly III 的 Compose 文件末尾。

<details markdown="block">
<summary markdown="span">展开 `expense-api` 的 Docker Compose 配置</summary>


```yaml
services:
  app:
    ...
  db:
    ...
  cron:
    ...

  expense-api:
    image: expense-api:latest
    restart: always
    container_name: expense-api
    ports:
      - "8081:8081"
    depends_on:
      - app
    environment:
      FIREFLY_URL: http://xxxx:8080
      FIREFLY_TOKEN: 这里填firefly III的个人访问令牌
      API_KEY: 这里填一个密码，后续用于快捷指令的认证
      LLM_API_URL: "https://api.deepseek.com/chat/completions"
      LLM_API_KEY: "sk-xxxxxxx"
      LLM_MODEL: "deepseek-flash"
    volumes:
      - /{somepath}/firefly_iii/expose_api/data:/app/data
      - /{somepath}/firefly_iii/expose_api/response:/app/response

volumes:
   firefly_iii_upload:
   firefly_iii_db:


```

</details>

`expense-api`的详细处理流程可参考[githhub仓库](https://github.com/SilenceEagle/firefly_iii_expense_api)

### 3. 配置 iPhone 快捷指令

可以直接[导入记账模板](https://www.icloud.com/shortcuts/a39b2859c4d0440e92b23251d549ca4d)，也可以按下面的步骤手动创建。

1. 添加「截屏」和「从截屏提取文本」动作。
2. 用「获取 URL 内容」向 `https://你的expense-api服务地址/edit` 发送请求。
    - 方法选 `POST`。
    - 请求头填 `Authorization: Bearer 你的API_KEY`。
    - 请求体选 `JSON`，将 `ocr_text` 的值设为提取的文本。
3. 从返回的「URL 的内容」中读取 `edit_id`，保存为变量 `EditID`。
4. 在「文本」动作中拼接 `https://你的expense-api服务地址/edit/` 和变量 `EditID`，再打开该网址以确认交易明细。

#### 快捷指令截图

<div class="project-doc-gallery">
  <figure>
    <a href="{{ '/assets/media/bookdeeping/shortcut-capture-and-submit.webp' | relative_url }}">
      <img src="{{ '/assets/media/bookdeeping/shortcut-capture-and-submit.webp' | relative_url }}" width="1170" height="2532" loading="lazy" alt="快捷指令截屏、提取文字并通过 POST 发送 ocr_text">
    </a>
    <figcaption>截图取字并提交解析</figcaption>
  </figure>
  <figure>
    <a href="{{ '/assets/media/bookdeeping/shortcut-open-review.webp' | relative_url }}">
      <img src="{{ '/assets/media/bookdeeping/shortcut-open-review.webp' | relative_url }}" width="1170" height="2532" loading="lazy" alt="快捷指令读取 edit_id、拼接确认页网址并打开">
    </a>
    <figcaption>读取结果并打开确认页</figcaption>
  </figure>
</div>

### 4. (可选)自定义Firefly III v6.7.9 的首页

`Firefly III`的默认首页内容较分散，经查阅发现[ezBookkeeping](https://ezbookkeeping-demo.mayswind.net/desktop#/login)的首页效果比较好，故将`Firefly III`的首页内容自定义成了这样的效果：

![自定义 Firefly III 首页]({{ '/assets/media/bookdeeping/custom-firefly.jpg' | relative_url }}){: .project-doc-image loading="lazy" }

部署：

```bash
git clone https://github.com/SilenceEagle/firefly_III_custom_dashboard.git
```

然后在上述firefly III的 Compose 文件中添加以下配置：
```yaml
services:
  app:
    volumes:
      - /{some path}/index.blade.php:/var/www/html/resources/views/index.blade.php:ro
      - /{some path}/assets:/var/www/html/public/custom-dashboard:ro
```
然后重新创建容器即可。

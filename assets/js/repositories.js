(() => {
  const ttl = 10 * 60 * 1000;
  const chinese = document.documentElement.lang.startsWith("zh");
  const requests = new Map();

  function valid(data) {
    return data && Number.isInteger(data.stargazers_count) && data.stargazers_count >= 0 &&
      Number.isInteger(data.forks_count) && data.forks_count >= 0 &&
      (data.description === null || typeof data.description === "string") &&
      (data.language === null || typeof data.language === "string");
  }

  async function update(card) {
    const repo = card.dataset.githubRepo;
    const key = `github-repo:v1:${repo.toLowerCase()}`;
    const status = card.querySelector("[data-repo-status]");
    const render = (data) => {
      card.querySelector("[data-repo-description]").textContent = data.description || (chinese ? "暂无简介" : "No description provided.");
      card.querySelector("[data-repo-stars]").textContent = data.stargazers_count.toLocaleString();
      card.querySelector("[data-repo-forks]").textContent = data.forks_count.toLocaleString();
      card.querySelector("[data-repo-language]").textContent = data.language || "";
    };
    let cached;
    try {
      cached = JSON.parse(localStorage.getItem(key));
      if (!cached || !valid(cached.data) || !Number.isFinite(cached.time)) cached = null;
    } catch {
      cached = null;
    }
    if (cached) {
      render(cached.data);
      const age = Date.now() - cached.time;
      if (age >= 0 && age < ttl) return;
    }
    status.textContent = chinese ? "正在更新统计…" : "Updating statistics…";
    try {
      if (!requests.has(repo)) {
        requests.set(repo, (async () => {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);
          try {
            const path = repo.split("/").map(encodeURIComponent).join("/");
            const response = await fetch(`https://api.github.com/repos/${path}`, {
              headers: { Accept: "application/vnd.github+json" },
              signal: controller.signal,
            });
            if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
            const data = await response.json();
            if (!valid(data)) throw new Error("Invalid repository data");
            return data;
          } finally {
            clearTimeout(timeout);
          }
        })());
      }
      const data = await requests.get(repo);
      render(data);
      status.textContent = "";
      try {
        localStorage.setItem(key, JSON.stringify({ time: Date.now(), data: {
          stargazers_count: data.stargazers_count, forks_count: data.forks_count,
          description: data.description, language: data.language,
        } }));
      } catch {
        // Storage may be disabled or full; statistics still display for this visit.
      }
    } catch {
      status.textContent = cached
        ? (chinese ? "更新失败，显示上次缓存的统计。" : "Update unavailable; showing saved statistics.")
        : (chinese ? "统计暂不可用，可点击仓库名称访问 GitHub。" : "Statistics unavailable. Visit the repository on GitHub.");
    }
  }

  document.querySelectorAll("[data-github-repo]").forEach(update);
})();

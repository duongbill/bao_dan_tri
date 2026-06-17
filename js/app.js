(function () {
  const state = {
    isDev: false,
    hasServer: false,
    loggedIn: false,
    latestArticle: null
  };

  const els = {
    currentDate: document.querySelector(".city-block span"),
    headlineCard: document.getElementById("headlineCard"),
    loginTrigger: document.getElementById("loginTrigger"),
    logoutTrigger: document.getElementById("logoutTrigger"),
    openUploadModal: document.getElementById("openUploadModal"),
    openManageModal: document.getElementById("openManageModal"),
    placeholderUploadTrigger: document.getElementById("placeholderUploadTrigger"),
    adminToolbar: document.getElementById("adminToolbar"),
    adminMenuTrigger: document.getElementById("adminMenuTrigger"),
    adminDropdown: document.getElementById("adminDropdown"),
    loginModal: document.getElementById("loginModal"),
    uploadModal: document.getElementById("uploadModal"),
    manageModal: document.getElementById("manageModal"),
    loginForm: document.getElementById("loginForm"),
    uploadForm: document.getElementById("uploadForm"),
    loginStatus: document.getElementById("loginStatus"),
    uploadStatus: document.getElementById("uploadStatus"),
    manageStatus: document.getElementById("manageStatus"),
    manageList: document.getElementById("manageList"),
    headlineImage: document.getElementById("headlineImage"),
    headlineMeta: document.getElementById("headlineMeta"),
    headlineTitle: document.getElementById("headlineTitle"),
    headlineSummary: document.getElementById("headlineSummary"),
    headlineBody: document.getElementById("headlineBody"),
    adminGreeting: document.getElementById("adminGreeting"),
    uploadPreview: document.getElementById("uploadPreview"),
    previewImage: document.getElementById("previewImage"),
    previewTitle: document.getElementById("previewTitle"),
    previewSummary: document.getElementById("previewSummary"),
    previewContent: document.getElementById("previewContent")
  };

  function renderCurrentDate() {
    if (!els.currentDate) return;
    const now = new Date();
    const weekdays = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7"
    ];
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    els.currentDate.textContent = `${weekdays[now.getDay()]}, ${day}/${month}/${year}`;
  }

  function setStatus(node, message, type) {
    if (!node) return;
    node.textContent = message || "";
    if (type) {
      node.dataset.state = type;
    } else {
      delete node.dataset.state;
    }
  }

  function openModal(node) {
    if (node) node.hidden = false;
  }

  function closeModal(node) {
    if (node) node.hidden = true;
  }

  function closeAdminDropdown() {
    if (els.adminDropdown) els.adminDropdown.hidden = true;
    if (els.adminMenuTrigger) els.adminMenuTrigger.setAttribute("aria-expanded", "false");
  }

  function toggleAdminDropdown() {
    if (!els.adminDropdown || !els.adminMenuTrigger) return;
    const nextHidden = !els.adminDropdown.hidden;
    els.adminDropdown.hidden = nextHidden;
    els.adminMenuTrigger.setAttribute("aria-expanded", String(!nextHidden));
  }

  function updateAdminVisibility() {
    document.body.classList.toggle("dev-mode", state.isDev);
    document.body.classList.toggle("admin-logged-in", state.isDev && state.loggedIn);
    if (!(state.isDev && state.loggedIn)) {
      closeAdminDropdown();
    }

    const devNodes = document.querySelectorAll(".dev-only");
    devNodes.forEach((node) => {
      node.hidden = !state.isDev;
    });

    const authenticatedNodes = document.querySelectorAll(".admin-authenticated");
    authenticatedNodes.forEach((node) => {
      node.hidden = !(state.isDev && state.loggedIn);
    });

    if (!state.isDev) {
      if (els.adminToolbar) els.adminToolbar.hidden = true;
      return;
    }

    if (els.loginTrigger) {
      els.loginTrigger.hidden = state.loggedIn;
    }

    if (els.adminToolbar) {
      els.adminToolbar.hidden = !state.loggedIn;
    }

    if (els.adminGreeting) {
      els.adminGreeting.textContent = state.loggedIn ? "Xin chào, admin" : "";
    }
  }

  function renderArticle(article) {
    if (!article) return;
    state.latestArticle = article;
    els.headlineTitle.textContent = article.title || "Bài mới";
    els.headlineSummary.textContent = "";
    els.headlineMeta.textContent = article.fileName
      ? `Bài mới từ ${article.sourceType.toUpperCase()}`
      : "Bài nổi bật";
    els.headlineImage.src = article.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80";
    els.headlineImage.alt = article.title || "Bài mới upload";
    els.headlineBody.hidden = true;
    els.headlineBody.textContent = "";
  }

  function goToLatestArticle() {
    window.location.href = "detail.html";
  }

  function bindLatestArticleLinks() {
    if (!els.headlineCard) return;

    els.headlineCard.classList.add("clickable-latest");
    els.headlineCard.setAttribute("tabindex", "0");
    els.headlineCard.setAttribute("role", "link");

    els.headlineCard.addEventListener("click", (event) => {
      if (event.target.closest("a, button, input, textarea, label")) return;
      goToLatestArticle();
    });

    els.headlineCard.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      goToLatestArticle();
    });
  }

  function renderUploadPreview(article) {
    if (!els.uploadPreview || !article) return;
    els.uploadPreview.hidden = false;
    if (els.previewImage) {
      if (article.image) {
        els.previewImage.hidden = false;
        els.previewImage.src = article.image;
        els.previewImage.alt = article.title || "Ảnh xem trước bài đăng";
      } else {
        els.previewImage.hidden = true;
        els.previewImage.removeAttribute("src");
      }
    }
    els.previewTitle.textContent = article.title || "Bài viết mới";
    els.previewSummary.textContent = article.summary || "Chưa có sapo.";
    els.previewContent.textContent = article.content || "Nội dung chi tiết sẽ hiển thị ở đây sau khi đọc file.";
  }

  function renderManageList(articles) {
    if (!els.manageList) return;

    if (!articles.length) {
      els.manageList.innerHTML = '<div class="manage-empty">Chưa có bài nào được lưu trong dự án.</div>';
      return;
    }

    els.manageList.innerHTML = articles
      .map((article) => {
        const createdAt = article.createdAt ? new Date(article.createdAt).toLocaleString("vi-VN") : "";
        return `
          <article class="manage-item" data-article-id="${article.id}">
            <div>
              <h3>${article.title || "Bài viết không có tiêu đề"}</h3>
              <p>${article.summary || ""}</p>
              <div class="manage-item-meta">
                <span>${article.fileName || "Không có file gốc"}</span>
                <span>${article.sourceType ? article.sourceType.toUpperCase() : ""}</span>
                <span>${createdAt}</span>
              </div>
            </div>
            <div class="manage-item-actions">
              <button type="button" class="admin-button" data-delete-article="${article.id}">Xóa bài</button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function fillUploadForm(article) {
    if (!els.uploadForm || !article) return;
    const titleInput = els.uploadForm.elements.namedItem("title");
    const summaryInput = els.uploadForm.elements.namedItem("summary");
    const contentInput = els.uploadForm.elements.namedItem("content");

    if (titleInput) titleInput.value = article.title || "";
    if (summaryInput) summaryInput.value = article.summary || "";
    if (contentInput) contentInput.value = article.content || "";
  }

  async function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        const base64 = result.includes(",") ? result.split(",")[1] : result;
        resolve(base64);
      };
      reader.onerror = () => reject(new Error("Không thể đọc file đã chọn."));
      reader.readAsDataURL(file);
    });
  }

  async function fetchJson(url, options) {
    const response = await fetch(url, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok) {
      const message = payload && payload.message ? payload.message : "Có lỗi xảy ra.";
      throw new Error(message);
    }

    return payload;
  }

  async function loadLatestArticle() {
    try {
      const response = await fetch("data/latest-article.json", { cache: "no-store" });
      if (!response.ok) return;
      const article = await response.json();
      renderArticle(article);
    } catch (error) {
      // Static file mode may block fetch; keep seeded HTML content.
    }
  }

  async function detectDevServer() {
    const hostname = window.location.hostname;
    const localHosts = new Set(["localhost", "127.0.0.1"]);
    const isLocalMachine =
      window.location.protocol === "file:" ||
      localHosts.has(hostname) ||
      hostname.endsWith(".local");

    state.isDev = isLocalMachine;

    try {
      const payload = await fetchJson("/api/session", { method: "GET" });
      state.isDev = true;
      state.hasServer = true;
      state.loggedIn = Boolean(payload.loggedIn);
    } catch (error) {
      state.hasServer = false;
      state.loggedIn = false;
    }
    updateAdminVisibility();
  }

  async function handleFilePreview(file) {
    if (!(file instanceof File) || !file.name) {
      return;
    }

    const lowerName = file.name.toLowerCase();
    if (!lowerName.endsWith(".pdf") && !lowerName.endsWith(".docx")) {
      setStatus(els.uploadStatus, "Chỉ hỗ trợ file .pdf hoặc .docx.", "error");
      return;
    }

    setStatus(els.uploadStatus, "Đang đọc file và tạo xem trước...");

    try {
      const base64 = await readFileAsBase64(file);
      const payload = await fetchJson("/api/articles/preview", {
        method: "POST",
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
          base64
        })
      });

      fillUploadForm(payload.article);
      renderUploadPreview(payload.article);
      setStatus(els.uploadStatus, "Đã tự điền dữ liệu từ file. Nếu nội dung đã ổn, bạn có thể bấm lưu ngay.", "success");
    } catch (error) {
      if (els.uploadPreview) {
        els.uploadPreview.hidden = true;
      }
      setStatus(els.uploadStatus, error.message, "error");
    }
  }

  async function loadManageArticles() {
    setStatus(els.manageStatus, "Đang tải danh sách bài viết...");
    try {
      const payload = await fetchJson("/api/articles", { method: "GET" });
      renderManageList(payload.articles || []);
      setStatus(els.manageStatus, "");
    } catch (error) {
      renderManageList([]);
      setStatus(els.manageStatus, error.message, "error");
    }
  }

  async function handleDeleteArticle(articleId) {
    if (!articleId) return;
    setStatus(els.manageStatus, "Đang xóa bài viết...");
    try {
      const payload = await fetchJson(`/api/articles/${encodeURIComponent(articleId)}`, {
        method: "DELETE"
      });
      if (payload.latest) {
        renderArticle(payload.latest);
      }
      await loadManageArticles();
      setStatus(els.manageStatus, "Đã xóa bài viết khỏi dự án.", "success");
    } catch (error) {
      setStatus(els.manageStatus, error.message, "error");
    }
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus(els.loginStatus, "Đang đăng nhập...");

    try {
      await fetchJson("/api/login", {
        method: "POST",
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password")
        })
      });
      state.loggedIn = true;
      updateAdminVisibility();
      setStatus(els.loginStatus, "Đăng nhập thành công.", "success");
      window.setTimeout(() => closeModal(els.loginModal), 300);
    } catch (error) {
      setStatus(els.loginStatus, error.message, "error");
    }
  }

  async function handleLogout() {
    try {
      await fetchJson("/api/logout", { method: "POST", body: JSON.stringify({}) });
    } catch (error) {
      // Even if logout API fails, reset local UI.
    }
    state.loggedIn = false;
    updateAdminVisibility();
  }

  async function handleUploadSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const file = formData.get("articleFile");

    if (!(file instanceof File) || !file.name) {
      setStatus(els.uploadStatus, "Bạn cần chọn file PDF hoặc DOCX trước.", "error");
      return;
    }

    const lowerName = file.name.toLowerCase();
    if (!lowerName.endsWith(".pdf") && !lowerName.endsWith(".docx")) {
      setStatus(els.uploadStatus, "Chỉ hỗ trợ file .pdf hoặc .docx.", "error");
      return;
    }

    setStatus(els.uploadStatus, "Đang đọc file và lưu bài vào dự án...");

    try {
      const base64 = await readFileAsBase64(file);
      const payload = await fetchJson("/api/articles", {
        method: "POST",
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
          base64,
          title: formData.get("title"),
          summary: formData.get("summary"),
          content: formData.get("content")
        })
      });

      renderArticle(payload.article);
      renderUploadPreview(payload.article);
      setStatus(els.uploadStatus, "Đã lưu bài viết vào dự án.", "success");
      form.reset();
      window.setTimeout(() => closeModal(els.uploadModal), 500);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setStatus(els.uploadStatus, error.message, "error");
    }
  }

  function bindEvents() {
    if (els.loginTrigger) {
      els.loginTrigger.addEventListener("click", (event) => {
        event.preventDefault();
        setStatus(els.loginStatus, "");
        openModal(els.loginModal);
      });
    }

    if (els.openUploadModal) {
      els.openUploadModal.addEventListener("click", () => {
        setStatus(els.uploadStatus, "");
        closeAdminDropdown();
        openModal(els.uploadModal);
      });
    }

    if (els.openManageModal) {
      els.openManageModal.addEventListener("click", async () => {
        closeAdminDropdown();
        openModal(els.manageModal);
        await loadManageArticles();
      });
    }

    if (els.placeholderUploadTrigger) {
      els.placeholderUploadTrigger.addEventListener("click", () => {
        if (!state.loggedIn) {
          setStatus(els.loginStatus, "");
          openModal(els.loginModal);
          return;
        }
        openModal(els.uploadModal);
      });
    }

    if (els.logoutTrigger) {
      els.logoutTrigger.addEventListener("click", () => {
        closeAdminDropdown();
        handleLogout();
      });
    }

    if (els.adminMenuTrigger) {
      els.adminMenuTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleAdminDropdown();
      });
    }

    if (els.loginForm) {
      els.loginForm.addEventListener("submit", handleLoginSubmit);
    }

    if (els.uploadForm) {
      els.uploadForm.addEventListener("submit", handleUploadSubmit);
      const fileInput = els.uploadForm.elements.namedItem("articleFile");
      if (fileInput) {
        fileInput.addEventListener("change", (event) => {
          const selectedFile = event.target.files && event.target.files[0];
          handleFilePreview(selectedFile);
        });
      }
    }

    document.querySelectorAll("[data-close-modal]").forEach((node) => {
      node.addEventListener("click", () => closeModal(els.loginModal));
    });

    document.querySelectorAll("[data-close-upload]").forEach((node) => {
      node.addEventListener("click", () => closeModal(els.uploadModal));
    });

    document.querySelectorAll("[data-close-manage]").forEach((node) => {
      node.addEventListener("click", () => closeModal(els.manageModal));
    });

    if (els.manageList) {
      els.manageList.addEventListener("click", (event) => {
        const deleteButton = event.target.closest("[data-delete-article]");
        if (!deleteButton) return;
        handleDeleteArticle(deleteButton.getAttribute("data-delete-article"));
      });
    }

    document.addEventListener("click", (event) => {
      if (!els.adminToolbar) return;
      if (!els.adminToolbar.contains(event.target)) {
        closeAdminDropdown();
      }
    });
  }

  async function init() {
    renderCurrentDate();
    bindLatestArticleLinks();
    bindEvents();
    await loadLatestArticle();
    await detectDevServer();
  }

  init();
})();

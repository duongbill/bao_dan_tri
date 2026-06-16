(function () {
  const fallbackImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80";
  const els = {
    articleCategory: document.getElementById("articleCategory"),
    articleTime: document.getElementById("articleTime"),
    articleTitle: document.getElementById("articleTitle"),
    authorName: document.getElementById("authorName"),
    articleSource: document.getElementById("articleSource"),
    articleLead: document.getElementById("articleLead"),
    articleFigure: document.getElementById("articleFigure"),
    articleImage: document.getElementById("articleImage"),
    articleCaption: document.getElementById("articleCaption"),
    articleBody: document.getElementById("articleBody"),
    mostReadTitle: document.getElementById("mostReadTitle"),
    mostReadList: document.getElementById("mostReadList"),
    relatedList: document.getElementById("relatedList"),
    commentCount: document.getElementById("commentCount"),
    commentList: document.getElementById("commentList"),
    tagList: document.getElementById("tagList"),
    detailStatus: document.getElementById("detailStatus")
  };

  const commentAuthors = [
    "Minh Anh",
    "Hoang Nguyen",
    "Thanh Lam",
    "Bao Tran",
    "Huy Vu",
    "Kim Oanh",
    "Gia Han",
    "Tuan Kiet",
    "Quoc Dat",
    "Linh Chi"
  ];

  const commentMessages = [
    "Bài viết dễ đọc, phần thông tin chính khá rõ ràng.",
    "Nếu có thêm vài hình ảnh trong bài thì trải nghiệm sẽ còn tốt hơn nữa.",
    "Cách trình bày mạch lạc, đọc hết không bị mệt.",
    "Tiêu đề và nội dung ăn khớp, cảm giác giống báo điện tử thật.",
    "Đoạn mở đầu cuốn người đọc, nhất là phần sapo.",
    "Mình thích kiểu bố cục này, nhìn gọn nhưng vẫn đủ thông tin.",
    "Nếu cập nhật thêm bình luận thời gian thực nữa thì rất ổn.",
    "Phần nội dung giữ được đúng tinh thần bài gốc là tốt rồi.",
    "Xem trên điện thoại cũng nên mượt như bản desktop này.",
    "Bản PDF gốc hiển thị ngay bên dưới là ý hay."
  ];

  function formatDate(dateString) {
    const date = dateString ? new Date(dateString) : new Date();
    return new Intl.DateTimeFormat("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function splitParagraphs(text) {
    return String(text || "")
      .split(/\n\s*\n|\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function buildTags(article) {
    const base = ["Dân trí", "Bài mới", article.sourceType ? article.sourceType.toUpperCase() : ""];
    const titleWords = String(article.title || "")
      .split(/\s+/)
      .filter((word) => word.length > 4)
      .slice(0, 3);
    return [...new Set([...base, ...titleWords])].filter(Boolean);
  }

  function buildMostReadItems(articles, currentArticle) {
    const pool = articles.length ? articles : [currentArticle];
    return pool.slice(0, 5);
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function createLatestLink() {
    const link = document.createElement("a");
    link.href = "detail.html";
    link.className = "related-link";
    return link;
  }

  function createSeededRandom(seedText) {
    let seed = 0;
    const source = String(seedText || "dan-tri");
    for (let index = 0; index < source.length; index += 1) {
      seed = (seed * 31 + source.charCodeAt(index)) >>> 0;
    }

    return function nextRandom() {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  function buildComments(article) {
    const random = createSeededRandom(article.id || article.title);
    const desiredCount = 6 + Math.floor(random() * 5);
    const comments = [];

    for (let index = 0; index < desiredCount; index += 1) {
      const author = commentAuthors[Math.floor(random() * commentAuthors.length)];
      const message = commentMessages[Math.floor(random() * commentMessages.length)];
      const minutesAgo = 8 + Math.floor(random() * 360);
      const likes = Math.floor(random() * 48);
      comments.push({
        id: `${article.id || "article"}-comment-${index}`,
        author,
        message,
        minutesAgo,
        likes
      });
    }

    return comments;
  }

  function renderArticle(article, articles) {
    const paragraphs = splitParagraphs(article.content);
    const lead = article.summary || paragraphs[0] || "(Dân trí) - Bài viết mới nhất vừa được đăng.";
    const bodyParagraphs = paragraphs.length ? paragraphs : [article.summary || "Nội dung bài viết đang được cập nhật."];
    const category = article.sourceType === "seed" ? "Mới nhất" : "Tin vừa đăng";
    const commentCount = Math.max(3, Math.min(28, bodyParagraphs.length * 2));
    const tags = buildTags(article);
    const mostReadItems = buildMostReadItems(articles, article);
    const relatedItems = mostReadItems.slice(0, 3);
    const comments = buildComments(article);

    document.title = `${article.title || "Chi tiết bài viết"} - Dân trí clone`;
    els.articleCategory.textContent = category;
    els.articleTime.textContent = formatDate(article.createdAt);
    els.articleTitle.textContent = article.title || "Bài viết mới nhất";
    els.authorName.textContent = article.author || "Ban biên tập";
    els.articleSource.textContent = article.fileName ? `Nguồn file: ${article.fileName}` : "Nguồn tổng hợp từ tòa soạn";
    els.articleLead.textContent = lead.startsWith("(Dân trí)") ? lead : `(Dân trí) - ${lead}`;
    els.articleImage.src = article.image || fallbackImage;
    els.articleImage.alt = article.title || "Ảnh minh họa bài viết";
    els.articleCaption.textContent = `Ảnh minh họa cho bài viết "${article.title || "mới nhất"}".`;
    els.articleFigure.hidden = false;
    els.articleBody.innerHTML = bodyParagraphs
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("");
    els.mostReadTitle.textContent = `ĐỌC NHIỀU TRONG ${category.toUpperCase()}`;
    els.commentCount.textContent = String(Math.max(commentCount, comments.length));

    els.mostReadList.innerHTML = "";
    mostReadItems.forEach((item, index) => {
      const articleNode = document.createElement("article");
      articleNode.className = "most-read-item";
      articleNode.innerHTML = `
        <span class="most-read-number">${index + 1}</span>
        <div class="most-read-copy">
          <h3>${escapeHtml(item.title || "Bài viết mới nhất")}</h3>
        </div>
        <img src="${escapeHtml(item.image || fallbackImage)}" alt="${escapeHtml(item.title || "Tin đọc nhiều")}" />
      `;
      const link = createLatestLink();
      link.appendChild(articleNode);
      els.mostReadList.appendChild(link);
    });

    els.relatedList.innerHTML = "";
    relatedItems.forEach((item) => {
      const link = createLatestLink();
      link.innerHTML = `
        <article class="related-article">
          <img src="${escapeHtml(item.image || fallbackImage)}" alt="${escapeHtml(item.title || "Bài liên quan")}" />
          <div>
            <h3>${escapeHtml(item.title || "Bài viết mới nhất")}</h3>
            <p>${escapeHtml(item.summary || lead)}</p>
          </div>
        </article>
      `;
      els.relatedList.appendChild(link);
    });

    els.tagList.innerHTML = "";
    tags.forEach((tag) => {
      const tagNode = document.createElement("a");
      tagNode.href = "detail.html";
      tagNode.className = "tag-chip";
      tagNode.textContent = tag;
      els.tagList.appendChild(tagNode);
    });

    if (els.commentList) {
      els.commentList.innerHTML = "";
      comments.forEach((comment) => {
        const commentNode = document.createElement("article");
        commentNode.className = "comment-item";
        commentNode.innerHTML = `
          <div class="comment-avatar">${escapeHtml(comment.author.slice(0, 1).toUpperCase())}</div>
          <div class="comment-body">
            <div class="comment-meta">
              <strong>${escapeHtml(comment.author)}</strong>
              <span>${comment.minutesAgo} phút trước</span>
            </div>
            <p>${escapeHtml(comment.message)}</p>
            <div class="comment-actions">
              <button type="button">Thích ${comment.likes}</button>
              <button type="button">Trả lời</button>
            </div>
          </div>
        `;
        els.commentList.appendChild(commentNode);
      });
    }

    els.detailStatus.hidden = true;
  }

  async function loadLatestArticle() {
    const response = await fetch("data/latest-article.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Không thể tải bài viết mới nhất.");
    }
    return response.json();
  }

  async function loadArticles() {
    try {
      const response = await fetch("/api/articles", { cache: "no-store" });
      if (!response.ok) return [];
      const payload = await response.json();
      return Array.isArray(payload.articles) ? payload.articles : [];
    } catch (error) {
      return [];
    }
  }

  async function init() {
    try {
      const [article, articles] = await Promise.all([loadLatestArticle(), loadArticles()]);
      renderArticle(article, articles);
    } catch (error) {
      els.detailStatus.hidden = false;
      els.detailStatus.textContent = error.message;
    }
  }

  init();
})();

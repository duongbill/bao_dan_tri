(function () {
  const fallbackImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80";
  const els = {
    currentDate: document.querySelector(".city-block span"),
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

  function renderCurrentDate() {
    if (!els.currentDate) return;
    const now = new Date();
    const weekdays = [
      "Chá»§ nháº­t",
      "Thá»© 2",
      "Thá»© 3",
      "Thá»© 4",
      "Thá»© 5",
      "Thá»© 6",
      "Thá»© 7"
    ];
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    els.currentDate.textContent = `${weekdays[now.getDay()]}, ${day}/${month}/${year}`;
  }

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
    "Bài hát này nghe cuốn quá, giai điệu rất bắt tai và gây nghiện!",
    "Visual của nhóm nhạc lần này đỉnh thật sự, không chê vào đâu được.",
    "Giai điệu nhẹ nhàng da diết rất hợp để nghe lúc làm việc hay thư giãn.",
    "Đoạn drop đỉnh quá, mình nghe đi nghe lại nãy giờ không chán.",
    "MV đầu tư công phu quá, góc quay và màu phim đẹp lung linh.",
    "Giọng vocal của bạn hát chính nghe xúc cảm và nội lực ghê.",
    "Thích nhất đoạn rap ở giữa bài, flow cực kỳ mượt mà.",
    "Bài này chắc chắn sẽ thành hit lớn thống trị các bảng xếp hạng cho xem!",
    "Xem phần vũ đạo trong MV mà mê mẩn luôn, nhảy đều tăm tắp.",
    "Hi vọng nhóm sẽ sớm ra mắt thêm nhiều sản phẩm âm nhạc chất lượng thế này."
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
    
    // Helper to shuffle a copy of an array using the seeded random generator
    function shuffle(array) {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
      }
      return copy;
    }

    const shuffledAuthors = shuffle(commentAuthors);
    const shuffledMessages = shuffle(commentMessages);

    // Limit desiredCount to the size of our pool to ensure uniqueness
    const maxCount = Math.min(commentMessages.length, commentAuthors.length);
    const desiredCount = Math.min(6 + Math.floor(random() * 5), maxCount);
    
    const comments = [];

    for (let index = 0; index < desiredCount; index += 1) {
      const author = shuffledAuthors[index];
      const message = shuffledMessages[index];
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

    // Sort comments by minutesAgo ascending (oldest to newest) to look natural
    comments.sort((a, b) => b.minutesAgo - a.minutesAgo);

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

  function initReactions() {
    const reactionButtons = document.querySelectorAll(".reaction-btn");
    reactionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const countEl = btn.querySelector(".reaction-count");
        if (!countEl) return;
        let count = parseInt(countEl.textContent, 10) || 0;
        
        const isReacted = btn.classList.contains("active-reaction");
        if (isReacted) {
          count -= 1;
          btn.classList.remove("active-reaction");
        } else {
          count += 1;
          btn.classList.add("active-reaction");
        }
        countEl.textContent = count;
      });
    });
  }

  async function init() {
    try {
      renderCurrentDate();
      const [article, articles] = await Promise.all([loadLatestArticle(), loadArticles()]);
      renderArticle(article, articles);
      initReactions();
    } catch (error) {
      els.detailStatus.hidden = false;
      els.detailStatus.textContent = error.message;
    }
  }

  init();
})();

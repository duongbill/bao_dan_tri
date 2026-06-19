const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const os = require("os");
const { execFile } = require("child_process");

const rootDir = __dirname;
const dataDir = path.join(rootDir, "data");
const uploadsDir = path.join(rootDir, "uploads");
const articleArchiveDir = path.join(dataDir, "articles");
const latestArticlePath = path.join(dataDir, "latest-article.json");
const sessions = new Map();
const adminUser = { username: "admin", password: "admin" };
const placeholderImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80";
const defaultLatestArticle = {
  id: "default-headline",
  title: "Vụ giám thị gợi ý thí sinh để bạn xem bài: Hai bài thi vẫn được công nhận",
  summary: "(Dân trí) - Đại diện Sở GD&ĐT Quảng Ninh cho biết thí sinh được nhờ hỗ trợ không xem được bài bạn, không sửa đáp án theo gợi ý của giám thị. Vì vậy, bài thi của cả hai thí sinh vẫn được giữ nguyên kết quả.",
  content: "",
  sourceType: "seed",
  fileName: "",
  createdAt: "2026-06-16T09:00:00+07:00",
  author: "system",
  image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=80"
};
const pinnedLatestArticle = {
  id: "1781843136824-ban-nhac-haydayz-ke-ve-chuyen-tinh-thanh-xuan-trong-album-ky-su-thoi-gian",
  title: "Ban nhạc Haydayz kể về chuyện tình thanh xuân trong album \"Ký sự thời gian\"",
  summary: "(Dân trí) - Haydayz chính thức ra mắt album đầu tay \"Ký sự thời gian\", khắc họa những cung bậc cảm xúc của tình yêu và tuổi trẻ, đồng thời gửi gắm thông điệp sống hết mình để không để lại nuối tiếc.",
  content: [
    "Ngày 19/6, ban nhạc Haydayz đã tổ chức buổi gặp gỡ truyền thông tại Hà Nội để chính thức giới thiệu sản phẩm âm nhạc đầu tay mang tên \"Ký sự thời gian\". Đây là dự án tâm huyết, đánh dấu sự trưởng thành của nhóm sau chặng đường nỗ lực hoạt động kể từ khi thành lập vào tháng 5/2024.",
    "Ban nhạc Haydayz tại buổi họp báo (Ảnh: Huyền Nguyễn)",
    "Hướng đến khán giả trẻ từ 16-30 tuổi yêu thích dòng nhạc chữa lành, album \"Ký sự thời gian\" gồm 5 ca khúc: \"Biết đâu\", \"Cho em\", \"Năm ngón bàn tay\", \"Phép màu\" và \"Hẹn lần sau\". Toàn bộ album tựa như một cuốn nhật ký âm nhạc về mối tình thanh xuân dang dở, dẫn dắt người nghe đi qua trọn vẹn các cung bậc cảm xúc từ những rung động đầu đời trong trẻo đến lời hẹn ước lần sau.",
    "Cuộc đời chúng ta khó tránh khỏi những tiếc nuối. Khác với nhiều tuyên ngôn chữa lành tập trung vào sự quên đi, \"Ký sự thời gian\" chọn cách cùng khán giả nhìn lại một tình yêu dang dở với nhân vật chính dường như dành cả đời để nhung nhớ một bóng hình. Na, thành viên của nhóm, cho biết tuy album kể về câu chuyện buồn nhưng thông điệp Haydayz muốn hướng đến vẫn là sự tích cực.",
    "Đó là lời nhắn nhủ mỗi người hãy sống trọn vẹn với hiện tại, hết mình với đam mê và dũng cảm thực hiện những điều còn dang dở, để khi nhìn lại sẽ không còn phải nuối tiếc.",
    "Điểm nhấn đặc biệt nhất của dự án nằm ở ý tưởng lấy cảm hứng từ thuyết \"Hồi quang phản chiếu\" - hiện tượng tâm lý khi não bộ dành ra 7 phút định mệnh cuối cùng để tua chậm lại những thước phim quan trọng nhất của cuộc đời. Dưới lăng kính này, mỗi bài hát đóng vai trò như một phân đoạn ký ức quay chậm, tái hiện câu chuyện tình yêu và thế giới nội tâm sâu sắc của chàng trai trong khoảnh khắc.",
    "\"Ký sự thời gian\" được thể hiện qua tài năng của 5 thành viên: Aki (Vocalist, sáng tác chính), Haha (Trưởng nhóm, keyboardist), Hoa Hoa (Guitarist), Natra (Drummer) và Na (Bassist).",
    "Aki trả lời câu hỏi của báo chí (Ảnh: Quỳnh Anh)",
    "Là vocalist cũng như sáng tác chính của nhóm, Aki chia sẻ: \"Chúng tôi không cố gắng chạy theo các trào lưu sôi động của thị trường, mà chọn cách chạm vào lòng người bằng sự mộc mạc và chân thành nhất. Dù ở thế hệ nào, những nuối tiếc về một thời thanh xuân đã qua vẫn luôn là một phần ký ức đẹp đẽ mà mỗi khi nhìn lại, chúng ta đều có thể mỉm cười và bao dung với quá khứ.\""
  ].join("\n\n"),
  sourceType: "pdf",
  fileName: "haydays.pdf",
  createdAt: "2026-06-19T04:25:36.824Z",
  author: "admin",
  image: "uploads/1781843136827-haydays-cover.jpg",
  inlineImage: "uploads/z7952899057289_1aff098373cf58bfdea1c263fff9d987.jpg",
  storedFile: "uploads/1781843136824-haydays.pdf"
};

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function sendText(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

async function ensureDirectories() {
  await fsp.mkdir(dataDir, { recursive: true });
  await fsp.mkdir(uploadsDir, { recursive: true });
  await fsp.mkdir(articleArchiveDir, { recursive: true });
  await fsp.writeFile(latestArticlePath, JSON.stringify(pinnedLatestArticle, null, 2), "utf8");
}

function parseCookies(req) {
  const cookieHeader = req.headers.cookie || "";
  return cookieHeader.split(";").reduce((acc, item) => {
    const [rawKey, ...rawValue] = item.trim().split("=");
    if (!rawKey) return acc;
    acc[rawKey] = decodeURIComponent(rawValue.join("="));
    return acc;
  }, {});
}

function getSession(req) {
  const cookies = parseCookies(req);
  const sid = cookies.sid;
  if (!sid) return null;
  return sessions.get(sid) || null;
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 30 * 1024 * 1024) {
        reject(new Error("Payload quá lớn."));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function slugify(input) {
  return String(input || "bai-viet")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "bai-viet";
}

function stripPdfText(buffer) {
  const binary = buffer.toString("latin1");
  const matches = binary.match(/\(([^()]{10,500})\)/g) || [];
  const text = matches
    .map((item) => item.slice(1, -1))
    .join(" ")
    .replace(/\\[rn]/g, " ")
    .replace(/\\\)/g, ")")
    .replace(/\\\(/g, "(")
    .replace(/\s+/g, " ")
    .trim();
  return text;
}

function extractParagraphsFromPlainText(text) {
  const lines = String(text || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((item) => item.replace(/\s+/g, " ").trim());
  const paragraphs = [];
  let current = "";

  function flushCurrent() {
    if (!current) return;
    paragraphs.push(current.trim());
    current = "";
  }

  for (const line of lines) {
    if (!line) {
      flushCurrent();
      continue;
    }

    const isBullet = /^[•\-*]/.test(line);
    if (isBullet) {
      flushCurrent();
      current = line;
      continue;
    }

    if (!current) {
      current = line;
      continue;
    }

    const shouldMerge =
      current.length < 160 ||
      !/[.!?:"”)]$/.test(current) ||
      /^[a-zàáảãạăắằẳẵặâấầẩẫậđèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]/i.test(line);

    if (shouldMerge) {
      current = `${current} ${line}`;
    } else {
      flushCurrent();
      current = line;
    }
  }

  flushCurrent();
  return paragraphs.filter(Boolean);
}

function pickArticleParts(paragraphs) {
  const normalizedParagraphs = paragraphs
    .map((item) => String(item || "").trim())
    .filter(Boolean);

  const title =
    normalizedParagraphs.find((item) => item.length >= 12 && item.length <= 180) ||
    normalizedParagraphs[0] ||
    "";
  const titleIndex = normalizedParagraphs.indexOf(title);
  const remaining = normalizedParagraphs.filter((_, index) => index !== titleIndex);
  const preferredSummary =
    remaining.find((item) => /^\(Dân trí\)\s*-/i.test(item)) ||
    remaining.find((item) => /^\(Dan tri\)\s*-/i.test(item)) ||
    remaining.find((item) => !/^[•\-*]/.test(item) && item.length >= 40 && item.length <= 420) ||
    remaining[0];
  const summary = preferredSummary || title;
  const summaryIndex = normalizedParagraphs.indexOf(summary);
  const bodyParagraphs = normalizedParagraphs.filter(
    (_, index) => index !== titleIndex && index !== summaryIndex
  );

  return { title, summary, bodyParagraphs };
}

function execFilePromise(file, args) {
  return new Promise((resolve, reject) => {
    execFile(file, args, { windowsHide: true, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
        return;
      }
      resolve(stdout);
    });
  });
}

async function extractDocxText(filePath) {
  const tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), "bao-docx-"));
  try {
    await execFilePromise("powershell.exe", [
      "-NoProfile",
      "-Command",
      `Expand-Archive -LiteralPath '${filePath.replace(/'/g, "''")}' -DestinationPath '${tempDir.replace(/'/g, "''")}' -Force`
    ]);

    const documentXmlPath = path.join(tempDir, "word", "document.xml");
    const xml = await fsp.readFile(documentXmlPath, "utf8");
    return xml
      .replace(/<\/w:p>/g, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\s+\n/g, "\n")
      .replace(/\n\s+/g, "\n")
      .trim();
  } finally {
    await fsp.rm(tempDir, { recursive: true, force: true });
  }
}

async function extractPdfTextWithPython(filePath) {
  const script = [
    "import sys",
    "sys.stdout.reconfigure(encoding='utf-8')",
    "from pypdf import PdfReader",
    "reader = PdfReader(sys.argv[1])",
    "parts = []",
    "for page in reader.pages:",
    "    text = page.extract_text() or ''",
    "    if text.strip():",
    "        parts.append(text)",
    "print('\\n\\n'.join(parts))"
  ].join("\n");

  return execFilePromise("python", ["-c", script, filePath]);
}

async function extractPdfFirstImageWithPython(filePath) {
  const script = [
    "import sys, json, base64",
    "sys.stdout.reconfigure(encoding='utf-8')",
    "from pypdf import PdfReader",
    "reader = PdfReader(sys.argv[1])",
    "candidates = []",
    "for page_index, page in enumerate(reader.pages):",
    "    images = getattr(page, 'images', [])",
    "    if not images:",
    "        continue",
    "    for image_index, image in enumerate(images):",
    "        name = getattr(image, 'name', 'image.bin')",
    "        data = getattr(image, 'data', b'') or b''",
    "        width = int(getattr(image, 'width', 0) or 0)",
    "        height = int(getattr(image, 'height', 0) or 0)",
    "        area = width * height",
    "        candidates.append({",
    "            'name': name,",
    "            'base64': base64.b64encode(data).decode('ascii'),",
    "            'page_index': page_index,",
    "            'image_index': image_index,",
    "            'width': width,",
    "            'height': height,",
    "            'area': area,",
    "            'size': len(data)",
    "        })",
    "result = None",
    "if candidates:",
    "    meaningful = [item for item in candidates if item['area'] >= 120000 or item['size'] >= 50000]",
    "    pool = meaningful or candidates",
    "    pool.sort(key=lambda item: (item['area'], item['size'], -item['page_index'], -item['image_index']), reverse=True)",
    "    result = pool[0]",
    "print(json.dumps(result, ensure_ascii=False))"
  ].join("\n");

  const stdout = await execFilePromise("python", ["-c", script, filePath]);
  const parsed = JSON.parse(String(stdout || "null").trim() || "null");
  if (!parsed || !parsed.base64) {
    return null;
  }

  return {
    fileName: parsed.name || "image.bin",
    buffer: Buffer.from(parsed.base64, "base64")
  };
}

async function extractPdfTextViaWord(filePath) {
  const tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), "bao-pdf-"));
  const outputPath = path.join(tempDir, "article.txt");
  const escapedInput = filePath.replace(/'/g, "''");
  const escapedOutput = outputPath.replace(/'/g, "''");
  const psScript = [
    "$ErrorActionPreference = 'Stop'",
    "$word = $null",
    "$doc = $null",
    "try {",
    "  $word = New-Object -ComObject Word.Application",
    "  $word.Visible = $false",
    `  $doc = $word.Documents.Open('${escapedInput}', $false, $true)`,
    `  $doc.SaveAs2('${escapedOutput}', 7)`,
    "  $doc.Close()",
    "  $word.Quit()",
    "} finally {",
    "  if ($doc -ne $null) { try { $doc.Close() } catch {} }",
    "  if ($word -ne $null) { try { $word.Quit() } catch {} }",
    "}",
    `Get-Content -LiteralPath '${escapedOutput}' -Raw -Encoding Unicode`
  ].join("; ");

  try {
    return await execFilePromise("powershell.exe", ["-NoProfile", "-Sta", "-Command", psScript]);
  } finally {
    await fsp.rm(tempDir, { recursive: true, force: true });
  }
}

async function parseArticleFile(filePath, extension) {
  if (extension === ".docx") {
    const text = await extractDocxText(filePath);
    return extractParagraphsFromPlainText(text);
  }

  if (extension === ".pdf") {
    try {
      const text = await extractPdfTextWithPython(filePath);
      const paragraphs = extractParagraphsFromPlainText(text);
      if (paragraphs.length) {
        return paragraphs;
      }
    } catch (error) {
      // Continue to local fallbacks.
    }

    try {
      const text = await extractPdfTextViaWord(filePath);
      const paragraphs = extractParagraphsFromPlainText(text);
      if (paragraphs.length) {
        return paragraphs;
      }
    } catch (error) {
      // Fallback to basic binary scraping if Word conversion is unavailable.
    }

    const buffer = await fsp.readFile(filePath);
    const text = stripPdfText(buffer);
    return extractParagraphsFromPlainText(text);
  }

  return [];
}

function buildArticle({ fileName, title, summary, content, paragraphs }) {
  const parsedParts = pickArticleParts(paragraphs);
  const normalizedParagraphs = paragraphs.filter(Boolean);
  const sourceType = path.extname(fileName).slice(1).toLowerCase();
  const derivedTitle = title || normalizedParagraphs[0] || "Bài viết mới upload";
  const derivedSummary = summary || normalizedParagraphs[1] || normalizedParagraphs[0] || "Bài viết vừa được thêm từ máy dev.";
  const bodyParagraphs = content
    ? extractParagraphsFromPlainText(content)
    : sourceType === "pdf"
      ? normalizedParagraphs.slice(1)
      : parsedParts.bodyParagraphs.slice(0, 12);
  const finalTitle = title || parsedParts.title || derivedTitle;
  const finalSummary = summary || parsedParts.summary || derivedSummary;

  return {
    id: `${Date.now()}-${slugify(finalTitle)}`,
    title: finalTitle,
    summary: finalSummary,
    content: bodyParagraphs.join("\n\n"),
    sourceType,
    fileName,
    createdAt: new Date().toISOString(),
    author: "admin",
    image: placeholderImage
  };
}

function buildArticlePreview({ fileName, title, summary, content, paragraphs }) {
  return buildArticle({ fileName, title, summary, content, paragraphs });
}

async function saveArticleAssets({ fileName, buffer, article }) {
  const safeName = `${Date.now()}-${slugify(path.basename(fileName, path.extname(fileName)))}${path.extname(fileName).toLowerCase()}`;
  const savedFilePath = path.join(uploadsDir, safeName);
  await fsp.writeFile(savedFilePath, buffer);

  let imagePath = article.image;
  if (article.imageAsset && article.imageAsset.buffer) {
    const imageExt = path.extname(article.imageAsset.fileName || "").toLowerCase() || ".jpg";
    const safeImageName = `${Date.now()}-${slugify(path.basename(fileName, path.extname(fileName)))}-cover${imageExt}`;
    const savedImagePath = path.join(uploadsDir, safeImageName);
    await fsp.writeFile(savedImagePath, article.imageAsset.buffer);
    imagePath = path.relative(rootDir, savedImagePath).replace(/\\/g, "/");
  }

  const archivedArticlePath = path.join(articleArchiveDir, `${article.id}.json`);
  const articleToStore = {
    ...article,
    image: imagePath,
    storedFile: path.relative(rootDir, savedFilePath).replace(/\\/g, "/")
  };
  delete articleToStore.imageAsset;

  await fsp.writeFile(archivedArticlePath, JSON.stringify(articleToStore, null, 2), "utf8");

  return articleToStore;
}

async function readStoredArticles() {
  const entries = await fsp.readdir(articleArchiveDir, { withFileTypes: true });
  const articles = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) {
      continue;
    }

    const filePath = path.join(articleArchiveDir, entry.name);
    try {
      const raw = await fsp.readFile(filePath, "utf8");
      articles.push(JSON.parse(raw));
    } catch (error) {
      // Ignore unreadable article records.
    }
  }

  return articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

async function deleteStoredArticle(articleId) {
  const articlePath = path.join(articleArchiveDir, `${articleId}.json`);
  const raw = await fsp.readFile(articlePath, "utf8");
  const article = JSON.parse(raw);

  if (article.storedFile) {
    const uploadPath = path.join(rootDir, article.storedFile);
    if (uploadPath.startsWith(rootDir)) {
      await fsp.rm(uploadPath, { force: true });
    }
  }

  if (article.image && !/^https?:\/\//i.test(article.image)) {
    const imagePath = path.join(rootDir, article.image);
    if (imagePath.startsWith(rootDir)) {
      await fsp.rm(imagePath, { force: true });
    }
  }

  await fsp.rm(articlePath, { force: true });

  let currentLatest = pinnedLatestArticle;
  try {
    currentLatest = JSON.parse(await fsp.readFile(latestArticlePath, "utf8"));
  } catch (error) {
    currentLatest = pinnedLatestArticle;
  }

  if (currentLatest.id === articleId) {
    const remainingArticles = await readStoredArticles();
    const nextLatest = remainingArticles[0] || pinnedLatestArticle;
    await fsp.writeFile(latestArticlePath, JSON.stringify(nextLatest, null, 2), "utf8");
    return { deleted: article, latest: nextLatest };
  }

  return { deleted: article, latest: currentLatest };
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".js") return "application/javascript; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".gif") return "image/gif";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

async function serveStatic(req, res, pathname) {
  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.join(rootDir, relativePath);

  if (!filePath.startsWith(rootDir)) {
    sendText(res, 403, "Forbidden");
    return;
  }

  try {
    const stats = await fsp.stat(filePath);
    if (stats.isDirectory()) {
      sendText(res, 403, "Forbidden");
      return;
    }
    const content = await fsp.readFile(filePath);
    res.writeHead(200, { "Content-Type": getMimeType(filePath) });
    res.end(content);
  } catch (error) {
    sendText(res, 404, "Not found");
  }
}

async function handleApi(req, res, pathname) {
  if (pathname === "/api/session" && req.method === "GET") {
    const session = getSession(req);
    sendJson(res, 200, { loggedIn: Boolean(session) });
    return true;
  }

  if (pathname === "/api/login" && req.method === "POST") {
    const body = JSON.parse(await readRequestBody(req) || "{}");
    if (body.username !== adminUser.username || body.password !== adminUser.password) {
      sendJson(res, 401, { message: "Sai tài khoản hoặc mật khẩu." });
      return true;
    }

    const sid = crypto.randomBytes(24).toString("hex");
    sessions.set(sid, { username: adminUser.username, createdAt: Date.now() });
    res.setHeader("Set-Cookie", `sid=${sid}; HttpOnly; Path=/; SameSite=Lax`);
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (pathname === "/api/logout" && req.method === "POST") {
    const cookies = parseCookies(req);
    if (cookies.sid) {
      sessions.delete(cookies.sid);
    }
    res.setHeader("Set-Cookie", "sid=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax");
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (pathname === "/api/articles" && req.method === "POST") {
    const session = getSession(req);
    if (!session) {
      sendJson(res, 401, { message: "Bạn cần đăng nhập admin trước khi đăng bài." });
      return true;
    }

    const body = JSON.parse(await readRequestBody(req) || "{}");
    const fileName = String(body.fileName || "");
    const extension = path.extname(fileName).toLowerCase();

    if (!fileName || !body.base64) {
      sendJson(res, 400, { message: "Thiếu file upload." });
      return true;
    }

    if (extension !== ".pdf" && extension !== ".docx") {
      sendJson(res, 400, { message: "Chỉ hỗ trợ file .pdf hoặc .docx." });
      return true;
    }

    const buffer = Buffer.from(body.base64, "base64");
    const tempPath = path.join(uploadsDir, `tmp-${Date.now()}${extension}`);

    try {
      await fsp.writeFile(tempPath, buffer);
      const paragraphs = await parseArticleFile(tempPath, extension);
      const imageAsset = extension === ".pdf" ? await extractPdfFirstImageWithPython(tempPath) : null;
      const article = buildArticle({
        fileName,
        title: String(body.title || "").trim(),
        summary: String(body.summary || "").trim(),
        content: String(body.content || "").trim(),
        paragraphs
      });
      if (imageAsset) {
        article.imageAsset = imageAsset;
      }
      const savedArticle = await saveArticleAssets({ fileName, buffer, article });
      sendJson(res, 200, { ok: true, article: savedArticle });
    } catch (error) {
      sendJson(res, 500, {
        message: `Không thể xử lý file upload. ${error.message || "Lỗi không xác định."}`
      });
    } finally {
      await fsp.rm(tempPath, { force: true });
    }
    return true;
  }

  if (pathname === "/api/articles" && req.method === "GET") {
    const session = getSession(req);
    if (!session) {
      sendJson(res, 401, { message: "Bạn cần đăng nhập admin trước khi xem danh sách bài viết." });
      return true;
    }

    const articles = await readStoredArticles();
    sendJson(res, 200, { ok: true, articles });
    return true;
  }

  if (pathname === "/api/articles/preview" && req.method === "POST") {
    const session = getSession(req);
    if (!session) {
      sendJson(res, 401, { message: "Bạn cần đăng nhập admin trước khi xem trước bài viết." });
      return true;
    }

    const body = JSON.parse(await readRequestBody(req) || "{}");
    const fileName = String(body.fileName || "");
    const extension = path.extname(fileName).toLowerCase();

    if (!fileName || !body.base64) {
      sendJson(res, 400, { message: "Thiếu file để xem trước." });
      return true;
    }

    if (extension !== ".pdf" && extension !== ".docx") {
      sendJson(res, 400, { message: "Chỉ hỗ trợ file .pdf hoặc .docx." });
      return true;
    }

    const buffer = Buffer.from(body.base64, "base64");
    const tempPath = path.join(uploadsDir, `preview-${Date.now()}${extension}`);

    try {
      await fsp.writeFile(tempPath, buffer);
      const paragraphs = await parseArticleFile(tempPath, extension);
      const imageAsset = extension === ".pdf" ? await extractPdfFirstImageWithPython(tempPath) : null;
      const article = buildArticlePreview({
        fileName,
        title: "",
        summary: "",
        content: "",
        paragraphs
      });
      if (imageAsset) {
        article.image = `data:${getMimeType(imageAsset.fileName)};base64,${imageAsset.buffer.toString("base64")}`;
      }
      sendJson(res, 200, { ok: true, article });
    } catch (error) {
      sendJson(res, 500, {
        message: `Không thể đọc nội dung file. ${error.message || "Lỗi không xác định."}`
      });
    } finally {
      await fsp.rm(tempPath, { force: true });
    }
    return true;
  }

  if (pathname.startsWith("/api/articles/") && req.method === "DELETE") {
    const session = getSession(req);
    if (!session) {
      sendJson(res, 401, { message: "Bạn cần đăng nhập admin trước khi xóa bài viết." });
      return true;
    }

    const articleId = decodeURIComponent(pathname.slice("/api/articles/".length));
    if (!articleId) {
      sendJson(res, 400, { message: "Thiếu mã bài viết cần xóa." });
      return true;
    }

    try {
      const result = await deleteStoredArticle(articleId);
      sendJson(res, 200, { ok: true, ...result });
    } catch (error) {
      sendJson(res, 404, { message: "Không tìm thấy bài viết để xóa." });
    }
    return true;
  }

  return false;
}

async function bootstrap() {
  await ensureDirectories();

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    try {
      if (url.pathname.startsWith("/api/")) {
        const handled = await handleApi(req, res, url.pathname);
        if (!handled) {
          sendJson(res, 404, { message: "API not found." });
        }
        return;
      }

      await serveStatic(req, res, url.pathname);
    } catch (error) {
      sendJson(res, 500, { message: error.message || "Server error." });
    }
  });

  const port = Number(process.env.PORT || 3210);
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});

# THE STORY LAB｜事物探索研究所

> **A Journal of Everyday Discoveries — 一本探索日常事物、設計美學與文化歷史的線上編輯雜誌。**

---

## 📖 專案介紹與製作理念

**THE STORY LAB（事物探索研究所）** 是一座獨立線上數位誌，專注於挖掘日常生活中習以為常的事物背後隱藏的科學機理、工藝美學與物質文化演進。

我們深信「萬物皆有其由來與脈絡」。當我們放慢腳步審視一瓶香水香氣的前中後調、一場初雨灑落大地的清新泥土芬芳、一條磨損鉚釘牛仔褲的淘金歲月、一枚珍珠在海洋深處的光學層疊，或是一封信件從驛站火漆封緘走向電子郵件的通訊變遷，平凡的物件便能重現其動人的知識厚度。

網站摒棄浮躁的演算法與速食內容，秉持**法式浪漫復古編輯風（French Romantic Vintage Editorial）**結合當代數位出版品格調，打造兼具知識深度、版面詩意與沉浸式視覺饗宴的閱讀空間。

---

## ✨ 網站特色與已完成功能

1. **靜態純粹，零外部框架依賴（Zero Dependencies）**
   - 採用純原生 **HTML5 / CSS3 / Vanilla JavaScript**，不使用 React、Vue、Node 構建工具或肥大套件庫，載入極速且極致輕量。
2. **法式復古編輯視覺系統（French Romantic Vintage Editorial System）**
   - 暖米白（`#FFF9F5`）、淡裸粉（`#F3E4E3`）、乾燥玫瑰（`#B9878C`）與深暖棕（`#574448`）的雅緻低飽和色調。
   - 融合古典襯線標題（Cinzel / Playfair Display / Noto Serif TC）與清晰無襯線正文，搭配專屬紙質紋理與手工感細膩陰影。
3. **四種文章視覺氛圍（One Brand, Four Visual Identities）**
   - **法式浪漫復古（Romantic）**：柔和緞帶、襯線典雅、蕾絲邊飾。
   - **古典精緻編輯（Refined）**：幾何雙線框、莊重排版、歷史質感。
   - **復古手帳拼貼（Scrapbook）**：紙膠帶邊角、印章戳記、工裝質感。
   - **極簡知性實驗（Experimental）**：精準標註、網格格線、微觀圖表。
4. **全站自適應響應式設計（Fully Responsive Design）**
   - 針對 Desktop（1440px+）、Laptop（1024px）、Tablet（768px）與 Mobile（480px / 375px）全面調校。
   - 手機版導覽抽屜選單、平滑錨點跳轉、進度閱讀條、分享功能與圖表橫向適配。
5. **資料驅動的動態渲染與分類索引（Data-Driven CMS Architecture）**
   - 透過 `data/articles.json` 統一管理全站中繼資料（Metadata）。
   - 首頁精選專題（Featured Articles）與最新文章（Latest Articles）自動動態掛載與狀態 fallback 機制。
   - 依分類動態過濾並渲染文章列表，包含標籤（Tags）、閱讀時間與預估字數。
6. **獨立原生 SVG 高解析度資訊圖表（Custom Vector Infographics）**
   - 全站所有文章配備純向量 SVG 圖表，具備 `viewBox` 自適應縮放、嚴格字級分級與多行 `<tspan>` 排版，杜絕文字溢出或裁切。
7. **全靜態 GitHub Pages 深度相容**
   - 嚴格遵守相對路徑層級（Level 0 根目錄與 Level 1 子目錄分離），確保離線開啟、本機伺服器與 GitHub Pages 網址路徑完全暢通。

---

## 🗂 三大文章分類

| 分類名稱 | 英文名稱 | 分類代碼 | 探索主軸 |
| :--- | :--- | :--- | :--- |
| **日常事物** | Everyday Mysteries | `everyday-mysteries` | 身邊習以為常的現象、物質與感官科學之謎（如氣味、光學、聲音）。 |
| **設計與造物** | Design & Creation | `design-creation` | 物件的誕生史、工藝構造、材料演化與設計哲學（如工裝服飾、日用品）。 |
| **起源與故事** | Origins & Stories | `origins-stories` | 文化習俗、通訊媒介、儀式符號的歷史變遷與人類行為心智（如信件、郵政）。 |

---

## 📚 已完成收錄文章（5 篇完整深度專題）

每一篇深度文章均嚴格具備 6 大標準模組：**導言（The Hook）**、**核心現象或原理（The Core Phenomenon）**、**深層機制或演化（The Deeper Mechanism）**、**文化或當代意涵（Cultural & Contemporary Meaning）**、**延伸思考（Looking Forward / Further Thought）** 與 **視覺圖表（Visual Infographic）**。

### 1. 香水為什麼有前調、中調、後調？
- **英文副標**：The Science Behind Perfume Notes
- **分類**：日常事物（Everyday Mysteries）｜**代碼**：`why-perfume-has-top-middle-base-notes`
- **閱讀時長**：6 MIN READ｜**視覺主題**：法式浪漫復古（Romantic）
- **簡介**：為什麼同一瓶香水，剛噴上與幾小時後聞起來截然不同？這不是香氣分段跳轉的魔法，而是一場由分子量（低於 150 Da 至高於 300 Da）、蒸氣壓與皮膚溫度共譜的連續揮發交響曲。內含完整的香調金字塔與揮發動力學圖表。

### 2. 為什麼雨後的空氣有一種特別的味道？
- **英文副標**：The Science of Petrichor
- **分類**：日常事物（Everyday Mysteries）｜**代碼**：`why-rain-has-a-distinctive-smell`
- **閱讀時長**：7 MIN READ｜**視覺主題**：極簡知性實驗（Experimental）
- **簡介**：久旱初雨的大地，空氣中總有一股清冽而濕潤的泥土芳香。本文深度拆解土壤鏈黴菌代謝物「土臭素（Geosmin）」、植物油脂乾燥分泌物，以及麻省理工學院高速攝影下雨滴撞擊多孔土壤產生的微型氣膠噴射（Aerosol Jet）物理現象。

### 3. 牛仔褲如何從淘金熱工裝，變成跨越世紀的時尚符號？
- **英文副標**：How Denim Became a Timeless Cultural Icon
- **分類**：設計與造物（Design & Creation）｜**代碼**：`how-denim-became-timeless`
- **閱讀時長**：8 MIN READ｜**視覺主題**：復古手帳拼貼（Scrapbook）
- **簡介**：從 1873 年舊金山淘金熱 Jacob Davis 與 Levi Strauss 的耐磨雙面金屬夾扣抗剪力鉚釘專利，到 1950 年代好萊塢《阿飛正傳》反叛青年的文化制服，再到現代高級時裝週的常客。解構牛仔褲跨越百年的物質文化演變。

### 4. 珍珠的顏色從哪裡來？
- **英文副標**：The Optical and Biological Origins of Pearl Colors
- **分類**：日常事物（Everyday Mysteries）｜**代碼**：`why-pearls-have-different-colors`
- **閱讀時長**：7 MIN READ｜**視覺主題**：法式浪漫復古（Romantic）
- **簡介**：從純淨無暇的白珠、柔和神祕的粉光，到攝人心魄的大溪地黑珍珠與南洋金珠。解開軟體動物外套膜分泌、文石奈米晶體（Aragonite Platelets）磚牆結構、硬蛋白（Conchiolin）與光線多層薄膜光學干涉（Thin-Film Interference）的珠寶科學之謎。

### 5. 從驛站、郵票到電子郵件：我們是如何學會「隔空對話」的？
- **英文副標**：From Postal Relays to Email: How Humanity Learned to Converse Across Distance
- **分類**：起源與故事（Origins & Stories）｜**代碼**：`from-letters-to-email`
- **閱讀時長**：8 MIN READ｜**視覺主題**：古典精緻編輯（Refined）
- **簡介**：從古代帝國的烽火與驛馬飛馳、1840 年改變全球通訊經濟結構的英國「黑便士（Penny Black）」郵票，到 1971 年 ARPANET 上 Ray Tomlinson 敲下的第一個「@」符號。一場關於人類如何跨越地理與時間尺度、重塑心靈對話距離的傳播技術史與心理變奏。

---

## 🛠 使用技術

- **標記語言**：HTML5（語意化標籤，遵循無障礙與 SEO 標準）
- **樣式設計**：純原生 CSS3
  - CSS Custom Properties（全站設計變數）
  - Flexbox 與 CSS Grid 雙重彈性佈局
  - 自適應 Media Queries（1440px, 1024px, 768px, 480px, 375px）
  - 純 CSS 裝飾效果（手繪花邊、緞帶、紙質紋理）
- **互動腳本**：原生 Vanilla JavaScript（ES6+）
  - Fetch API 非同步載入文章中繼資料
  - Client-side DOM 動態渲染與分類篩選
  - 行動端導覽列切換與閱讀進度監聽
- **視覺媒介**：原生向量 SVG（精確座標計算、多行 `<tspan>` 排版、`preserveAspectRatio` 自適應縮放）

---

## 📁 專案資料夾結構

```text
the-story-lab/
├── index.html                           # 網站首頁（全站入口、精選文章、最新收錄）
├── about.html                           # 關於頁面（品牌理念、編輯室介紹、版權聲明）
├── README.md                            # 專案公開說明文件
├── AGENTS.md                            # AI 協作開發規範與技術約束規格書
├── .gitignore                           # Git 版本控制忽略清單
│
├── categories/                          # 分類頁面目錄（Level 1 相對路徑）
│   ├── everyday-mysteries.html          # 日常事物分類專頁
│   ├── design-creation.html             # 設計與造物分類專頁
│   └── origins-stories.html             # 起源與故事分類專頁
│
├── articles/                            # 文章實體 HTML 目錄（Level 1 相對路徑）
│   ├── why-perfume-has-top-middle-base-notes.html
│   ├── why-rain-has-a-distinctive-smell.html
│   ├── how-denim-became-timeless.html
│   ├── why-pearls-have-different-colors.html
│   └── from-letters-to-email.html
│
├── data/                                # 資料目錄
│   └── articles.json                    # 全站文章中繼資料清單（JSON 格式）
│
└── assets/                              # 靜態資源目錄
    ├── css/
    │   ├── style.css                    # 全站共用樣式表、導覽、頁尾與視覺系統變數
    │   └── article.css                  # 文章專屬排版、六大章節樣式與圖表容器規範
    │
    ├── js/
    │   ├── main.js                      # 全站共用 JavaScript（首頁動態載入、分類篩選）
    │   └── article.js                   # 文章專屬互動腳本（進度條、相關文章、閱讀時間計算）
    │
    └── images/                          # 靜態圖庫
        ├── brand/                       # 品牌 Logo、紋理與視覺識別元件
        └── articles/                    # 文章插圖與資訊圖表（依文章 slug 獨立子目錄）
            ├── why-perfume-has-top-middle-base-notes/
            │   ├── cover.svg
            │   └── figure-1.svg
            ├── why-rain-has-a-distinctive-smell/
            │   ├── cover.svg
            │   └── figure-1.svg
            ├── how-denim-became-timeless/
            │   ├── cover.svg
            │   └── figure-1.svg
            ├── why-pearls-have-different-colors/
            │   ├── cover.svg
            │   └── figure-1.svg
            └── from-letters-to-email/
                ├── cover.svg
                └── figure-1.svg
```

---

## 💻 本機啟動與瀏覽方式

由於網站使用標準 Fetch API 載入 `data/articles.json`，瀏覽器的安全原則（CORS）通常會限制以 `file:///` 協議直接讀取本機 JSON。建議透過輕量 HTTP 伺服器啟動：

### 方法一：使用 Python 內建 HTTP 伺服器（推薦）
1. 開啟終端機（Terminal / PowerShell），進入專案根目錄：
   ```bash
   cd the-story-lab
   ```
2. 啟動伺服器：
   ```bash
   # Python 3
   python -m http.server 8000
   ```
3. 開啟瀏覽器訪問：`http://localhost:8000/`

### 方法二：使用 Node.js / npx
```bash
npx serve .
# 或
npx http-server -p 8000
```

### 方法三：VS Code Live Server 擴充套件
- 在 VS Code 中開啟專案資料夾，右鍵點擊 `index.html`，選擇 **「Open with Live Server」** 即可。

---

## 🚀 GitHub Pages 部署方式

本專案完全為靜態檔案架構，無需任何編譯或打包流程，直接推送到 GitHub 即可透過 GitHub Pages 自動部署上線：

1. **建立 GitHub Repository**
   - 在 GitHub 建立公開（Public）儲存庫：`the-story-lab`。
2. **推送本機代碼至 GitHub**
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit with complete editorial architecture and 5 articles"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/the-story-lab.git
   git push -u origin main
   ```
3. **啟用 GitHub Pages**
   - 前往 GitHub 儲存庫頁面，依序點擊 **Settings** -> **Pages**。
   - 在 **Build and deployment** > **Source** 選擇 **Deploy from a branch**。
   - **Branch** 選擇 `main` 分支，資料夾選擇 `/ (root)`。
   - 點擊 **Save**。
4. **上線瀏覽**
   - 靜態網站將在 1-2 分鐘內自動完成部署，線上正式網址為：
     `https://<YOUR-USERNAME>.github.io/the-story-lab/`

---

## 🤖 AI 輔助開發方式與 AGENTS.md 專案規範

本專案全面實施結構化的 AI Agent 驅動開發流程。所有 AI 協作者均嚴格遵循根目錄的 [`AGENTS.md`](AGENTS.md) 核心規範：

1. **真實性與查核準則**：杜絕杜撰或捏造知識，所有科普機理、歷史年份與術語均經文獻考證。
2. **六大強制文章結構**：任何新收錄之文章必須完整覆蓋導言、核心原理、深層演化、文化意涵、延伸思考與資訊圖表。
3. **SVG 向量圖表工程防錯標準（Section 11）**：
   - 杜絕文字重疊與容器溢出，嚴格計算文字坐標、字級與 `<tspan>` 換行寬度。
   - 所有 SVG 容器一律配置自適應 `viewBox`，並在 CSS 中配置彈性約束。
4. **雙向同步更新協議**：每當新增或修改文章，必須同步維護實體 HTML、`data/articles.json` 索引檔，並執行連結完整性檢驗。

---

© 2026 THE STORY LAB｜事物探索研究所. All Rights Reserved.

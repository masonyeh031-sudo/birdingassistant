# 賞鳥助手

這個專案的 `賞鳥助手` 頁面支援兩種模式：

1. `真實 AI 影像辨識`
需要設定 `OPENAI_API_KEY`，上傳鳥類照片後會送到後端影像分析路由 `/api/bird-id`。

2. `站內輔助模式`
如果沒有設定 `OPENAI_API_KEY`，系統會自動降級成站內條件比對，不會卡在錯誤訊息。

## 啟用真實 AI 辨識

1. 複製環境變數範例檔：

```bash
cp .env.example .env.local
```

2. 打開 `.env.local`，把這行換成你的 OpenAI API key：

```bash
OPENAI_API_KEY=your_real_key_here
```

3. 重新啟動網站：

```bash
npm run start -- --hostname 127.0.0.1 --port 3000
```

如果你平常用開發模式，也可以改用：

```bash
npm run dev
```

## 目前使用的模型

預設是：

```bash
OPENAI_BIRD_ID_MODEL=gpt-4.1-mini
```

你也可以在 `.env.local` 裡改成其他支援圖片輸入的 OpenAI 模型。

## 部署成公開網站

如果你希望網站在你關掉電腦後還能持續運作，做法不是一直在本機開著，而是部署到雲端。

這個專案最適合的方式是部署到 Vercel，因為它本身就是 Next.js 專案，部署最穩也最省事。

### 建議部署流程

1. 把這個專案放到 GitHub
2. 登入 [Vercel](https://vercel.com/)
3. 點 `Add New Project`
4. 匯入你的 GitHub repository
5. 在 Vercel 的 Environment Variables 裡加入：

```bash
OPENAI_API_KEY=你的 OpenAI API key
OPENAI_BIRD_ID_MODEL=gpt-4.1
```

6. 按下 `Deploy`

部署完成後，你會拿到一個公開網址，例如：

`https://你的專案名稱.vercel.app`

### 上線後要檢查什麼

- 首頁是否正常打開
- `/assistant` 是否能正常上傳照片
- `/api/health` 是否回傳 `ok`
- 如果有設定 `OPENAI_API_KEY`，照片辨識是否能正常回傳候選結果

### 為什麼這樣比較穩

- 不依賴你的電腦是否開著
- Vercel 會自動處理 HTTPS
- 之後你只要更新 GitHub，網站就能自動重新部署

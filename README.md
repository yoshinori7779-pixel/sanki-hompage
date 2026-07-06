# 福原義教 個人ブランディングサイト

**テーマ:** 59歳トラック運転手がAIで人生を変える挑戦
**構成:** HTML / CSS / JavaScript の静的サイト（GitHub Pages 想定）

---

## ページ構成（全7ページ + 404）

| ファイル | 内容 |
| --- | --- |
| `index.html` | トップ（ヒーロー・ミッション・チャンネル紹介・最新記事・CTA） |
| `about.html` | 自己紹介（プロフィール・ストーリー・年表） |
| `youtube.html` | YouTube チャンネル紹介・動画一覧（プレースホルダー） |
| `tiktok.html` | TikTok（@youyoshi7）紹介・投稿ハイライト |
| `ai-tools.html` | AIツール紹介（解説記事形式） |
| `blog.html` | ブログ記事一覧（プレースホルダー） |
| `contact.html` | お問い合わせ（mailto 送信方式） |
| `404.html` | 404 ページ |

### 共通アセット
- `assets/style.css` … 全ページ共通スタイル
- `assets/main.js` … ナビ開閉・スクロール演出・タイピング・フォーム
- `assets/hero-motion.css` … トップページ専用ヒーローアニメーション

### SEO / その他
- `robots.txt` / `sitemap.xml` … 設置済み
- 各ページ: `meta description` / OGP / canonical / theme-color 設定済み
- アクセシビリティ: スキップリンク・フォーカス可視化・`prefers-reduced-motion` 対応

### デザイン
- 黒・青・白を基調とした近未来 HUD / デジタルモチーフ
- フォント: Oswald（見出し）/ Noto Sans JP（本文）/ JetBrains Mono（数値・ラベル）※Google Fonts（プリコネクト済み）

---

## 公開前のチェックリスト（要対応 / 依頼書 3章）

コード内の `TODO(...)` コメント箇所に対応してください。

### (1) 実データの反映
- [ ] **お問い合わせ送信先** … `contact.html` の `<form data-mailto="contact@example.com">` を実アドレスへ変更（現在は仮設定）
- [ ] **YouTube チャンネルURL** … `youtube.html` の `href="https://www.youtube.com/"` を確定URLへ
- [x] **TikTok @youyoshi7** … 確定済み（変更不要）
- [ ] **canonical / OGP / sitemap / robots のドメイン** … 独自ドメイン利用時は各ファイルの URL を実ドメインへ一括置換

### (2) 画像・動画素材の差し込み
- [ ] YouTube / TikTok の「VIDEO PREVIEW」プレースホルダーを実サムネイルへ
- [ ] `about.html` のプロフィール写真（`channel-avatar` の「義」部分。未使用時はそのままでも可）
- [ ] `assets/ogp.png`（1200×630 推奨）を追加 … OGP のシェア画像。未設置だと SNS シェア時に画像が表示されません

### (3) 公開設定
- [ ] GitHub Pages 等へデプロイ
- [ ] 独自ドメイン利用時は `CNAME` ファイル追加 + DNS 設定
- [ ] Google Search Console に `sitemap.xml` を登録

### (4) 動作確認
- [ ] スマホ / タブレット / PC の表示確認
- [ ] 全ページのナビ・アンカーリンク動作確認
- [ ] お問い合わせフォーム（mailto 起動）確認

---

## ローカルでの確認

```bash
# リポジトリ直下で簡易サーバを起動
python3 -m http.server 8000
# → http://localhost:8000/ をブラウザで開く
```

---

## 補足

- 旧「三紀運輸 採用サイト」は `sanki-recruit/` に退避しています（削除していません）。
- 外部依存は Google Fonts のみ（CDN 経由・プリコネクト設定済み）。

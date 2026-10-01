# 🎨 自分で描いたイラストを入れる

このフォルダ（`public/illustrations/`）に画像を置いて、
`src/data/illustrations.ts` にパスを書くと、UIをあなたの手描きイラストに差し替えられます。
（設定しない間は、コード内蔵の SVG キャラ／テキストロゴのまま）

## 対応フォーマット
PNG / JPG / SVG / WebP。**背景が透ける透過PNG がおすすめ**（キャラを切り抜いた絵）。

## 手順（2ステップ）

1. **画像をこのフォルダに置く**
   例）`public/illustrations/raino.png`, `public/illustrations/nyanko.png`

2. **`src/data/illustrations.ts` にパスを書く**
   ```ts
   export const ILLUSTRATIONS = {
     raino:     '/illustrations/raino.png',   // 案内人らいの
     nyanko:    '/illustrations/nyanko.png',  // 助手ねこにゃんこ
     titleLogo: '/illustrations/logo.png',    // タイトルロゴ（任意）
     background:'/illustrations/bg.png',      // 背景（任意）
   }
   ```
   保存すると自動で切り替わります。

## 表情ちがいも入れられる（任意）

1枚だけでもOKですが、表情ごとに絵を分けたいときはオブジェクトで指定：

```ts
nyanko: {
  happy:     '/illustrations/nyanko.png',
  excited:   '/illustrations/nyanko_excited.png',
  surprised: '/illustrations/nyanko_surprised.png',
},
raino: {
  smile: '/illustrations/raino.png',
  wink:  '/illustrations/raino_wink.png',
},
```
- らいのの表情：`smile` / `wink` / `think`
- にゃんこの表情：`happy` / `excited` / `surprised` / `sleepy`
- 指定が無い表情は、らいの＝`smile`／にゃんこ＝`happy` の絵にフォールバック。

## コツ
- キャラ絵は**縦長〜正方形**で、余白を切り詰めると配置がキレイ（高さ基準で表示されます）。
- 透過PNGなら吹き出しや背景と自然になじみます。
- ファイルは軽め（数百KB〜1MB程度）に。

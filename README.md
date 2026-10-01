# お出かけガチャ 🎫

休日に「暇だな〜」となったら、アンケートに答えてガチャを回すと、
案内人「らいの」と助手ねこ「にゃんこ」が**今日のお出かけプラン**を提案してくれるWebアプリ。

- Vite + React + TypeScript
- Framer Motion（演出）
- Google Maps / Places API（実在スポット）

## 開発

```bash
npm install
# .env を作成して APIキーを設定（.env.example 参照）
echo "VITE_GOOGLE_MAPS_API_KEY=あなたのキー" > .env
npm run dev          # http://localhost:5173
```

## ビルド

```bash
npm run build        # dist/ に出力
npm run preview      # 本番ビルドの確認
```

## デプロイ（Vercel）

1. GitHub にこのリポジトリを push
2. [vercel.com](https://vercel.com) で「New Project」→ GitHub リポジトリをインポート
   - Framework: **Vite**（自動検出）
   - Build: `npm run build` / Output: `dist`（自動）
3. **Environment Variables** に `VITE_GOOGLE_MAPS_API_KEY` を追加して Deploy
4. 公開後、Google Cloud の APIキーの **HTTPリファラー制限**に公開ドメイン
   （`https://◯◯.vercel.app/*` と独自ドメイン）を追加する
   - ※入れないと公開先で Places が `REQUEST_DENIED` になります
5. 課金対策：Google Cloud で**予算アラート/上限**を設定しておく

## カスタマイズ

- キャラ/背景イラストの差し替え → `public/illustrations/`（`src/data/illustrations.ts` でパス指定）
- アンケート項目 → `src/data/questions.ts`
- 検索条件のマッピング → `src/data/mapping.ts` / `src/lib/planner.ts`

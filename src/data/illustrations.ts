// ============================================================
//  自分で描いたイラストをここで差し込む（PNG/JPG/SVG/WebP）
// ============================================================
// 使い方:
//   1. public/illustrations/ に画像を置く（例: public/illustrations/raino.png）
//   2. 下の該当スロットに '/illustrations/raino.png' のように書く
//   3. 保存すると自動でその絵に切り替わる
//      （null の間は、コード内蔵の SVG / テキストロゴのまま）
//
// ・透過PNG が扱いやすい（背景が透ける）
// ・詳しい手順は public/illustrations/README.md を参照
//
// 表情差分を使いたい人へ:
//   raino / nyanko は「1枚の文字列」または「表情ごとの画像」を指定できる。
//   例）nyanko: { happy: '/illustrations/nyanko.png',
//                excited: '/illustrations/nyanko_excited.png' }
//   指定が無い表情は happy（にゃんこ）/ smile（らいの）の画像にフォールバック。

export type ArtSlot = string | Record<string, string> | null

export const ILLUSTRATIONS: {
  raino: ArtSlot
  nyanko: ArtSlot
  titleLogo: string | null
  background: string | null
  backgroundPortrait: string | null
} = {
  // 案内人「らいの」（mood: smile / wink / think）
  raino: '/illustrations/rhino.PNG',

  // 助手ねこ「にゃんこ」（mood: happy / excited / surprised / sleepy）
  nyanko: '/illustrations/nyanko.PNG',

  // タイトルのロゴ画像（お出かけガチャ の文字を手描きにしたいとき）
  titleLogo: null,

  // 背景イラスト（横長・PC/横向き用）
  background: '/illustrations/annaijo-bg-wide.jpg',
  // 背景イラスト（縦長・スマホ用）。null なら background を縦でも使う
  backgroundPortrait: '/illustrations/annaijo-bg-portrait.jpg',
}

// mood に応じて実際に使う画像URLを取り出す（無ければ null）
export function artUrl(slot: ArtSlot, mood: string, fallbackMood: string): string | null {
  if (!slot) return null
  if (typeof slot === 'string') return slot
  return slot[mood] ?? slot[fallbackMood] ?? Object.values(slot)[0] ?? null
}

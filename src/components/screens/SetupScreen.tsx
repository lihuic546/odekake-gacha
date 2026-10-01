import Raino from '../characters/Raino'
import Nyanko from '../characters/Nyanko'
import SpeechBubble from '../SpeechBubble'

// APIキー未設定時の「案内所 準備中」画面（アプリを落とさない）
export default function SetupScreen() {
  return (
    <div className="stack" style={{ flex: 1, gap: 16 }}>
      <div className="spacer" />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'flex-end' }}>
        <Raino size={110} mood="think" />
        <Nyanko size={80} mood="sleepy" />
      </div>

      <SpeechBubble who="らいの" tailAt={20}>
        ごめん、まだ案内所の“地図”が届いていないみたい。
        <b> Googleマップの鍵 </b>
        をセットすると占えるよ。
      </SpeechBubble>

      <div className="card">
        <h2 className="h1" style={{ marginTop: 0, fontSize: 18 }}>
          🗝️ セットアップ手順
        </h2>
        <ol style={{ paddingLeft: 20, lineHeight: 1.8, fontSize: 14, margin: 0 }}>
          <li>
            <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer">
              Google Cloud Console
            </a>
            でプロジェクトを作成し、<b>課金を有効化</b>
          </li>
          <li>
            「Maps JavaScript API」と「Places API (New)」を<b>有効化</b>
          </li>
          <li>APIキーを発行（HTTPリファラー制限で <code>localhost:5173</code> を許可）</li>
          <li>
            プロジェクト直下の <code>.env</code> に貼り付け：
            <pre
              style={{
                background: 'var(--cream)',
                padding: '10px 12px',
                borderRadius: 10,
                overflowX: 'auto',
                fontSize: 12,
                marginTop: 6,
              }}
            >
              VITE_GOOGLE_MAPS_API_KEY=あなたのキー
            </pre>
          </li>
          <li>
            開発サーバーを再起動： <code>npm run dev</code>
          </li>
        </ol>
      </div>

      <p className="muted center">
        鍵をセットして再読み込みすると、案内所がオープンします 🎫
      </p>
      <div className="spacer" />
    </div>
  )
}

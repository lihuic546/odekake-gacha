import { motion } from 'framer-motion'
import Raino from '../characters/Raino'
import Nyanko from '../characters/Nyanko'

export default function TitleScreen({ onStart }: { onStart: () => void }) {
  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        minHeight: 0,
        // 中央480pxのカラムから抜けて画面いっぱいに広げる（左右の余白をなくす）
        width: '100vw',
        left: '50%',
        marginLeft: '-50vw',
      }}
    >
      {/* 左：にゃんこ（右端を中心から NYANKO_FROM_CENTER vw 左に） */}
      <div
        className="floaty floaty--alt"
        style={{
          position: 'absolute',
          right: `calc(50% + 9vw)`,
          bottom: '20vh',
          zIndex: 1,
        }}
      >
        <Nyanko size="22vh" mood="happy" />
      </div>

      {/* 右：らいの（左端を中心から RAINO_FROM_CENTER vw 右に） */}
      <div
        className="floaty"
        style={{
          position: 'absolute',
          left: `calc(50% + 7vw)`,
          bottom: '7vh',
          zIndex: 1,
        }}
      >
        <Raino size="60vh" mood="smile" />
      </div>

      {/* 中央：丸い赤のガチャボタン（前面） */}
      <motion.button
        className="btn-round"
        onClick={onStart}
        whileTap={{ scale: 0.94 }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [1, 1.05, 1], opacity: 1 }}
        transition={{
          scale: { duration: 1.8, repeat: Infinity },
          opacity: { delay: 0.4 },
        }}
        style={{
          position: 'absolute',
          left: '50%',
          marginLeft: -76,
          bottom: '25vh',
          zIndex: 5,
        }}
      >
        ガチャを
        <br />
        まわす
      </motion.button>
    </div>
  )
}

# 美咲の箱 - 音楽変更メモ

## 現在の課題

「美咲の箱」(route_a1, route_a2, route_a_cafe, route_a_end)の音楽がしっくりこない。

## 現在使用中の音楽

おそらく以下のいずれか：
- `routeAShield` (route_a_shield.mp3) - ルートA：盾にならない
- `misakiMemory` (misaki_memory.mp3) - 美咲の記憶
- `officeNight` (office_night.mp3) - オフィスの夜

## 音楽変更の方向性

### オプション1: 新曲作成
より「美咲の箱」の雰囲気に合った新曲を作成：
- 静かで内省的
- ピアノとストリングス中心
- 謎めいた雰囲気
- 少し切なさを含む

### オプション2: 既存曲の入れ替え
未使用の既存曲を試す：
- `lostConnection` (lost_connection.mp3) - 失われた繋がり
- `akutoSolitude` (akuto_solitude.mp3) - 亜久斗の孤独
- `boxRevealed` (box_revealed.mp3) - 箱が明かされる

## 実装方法

### audio.js の sceneKeywords を変更

```javascript
sceneKeywords: {
    // route_a系のキーワードを変更
    routeAShield: ['美咲の箱', '盾にならない箱'],
    // または新しい曲名を追加
    misakiBoxTheme: ['美咲の箱', '盾にならない箱', '窓越しの距離'],
}
```

## TODO
- [x] 音楽の方向性を決定 → 既存曲を使用
- [x] 既存曲の選定 → `akutoSolitude` (亜久斗の孤独) を採用
- [x] audio.js のキーワードマッピング更新 → reader.jsで直接指定
- [ ] ゲームで実際に聴いて確認

## 決定事項（2025年12月29日）
**`akutoSolitude` (akuto_solitude.mp3) - 亜久斗の孤独** を採用

### 使用場所
- route_a1.md (前編) - 美咲の箱
- route_a2.md (中編) - 美咲の箱
- route_a_end.md (終章) - 美咲の箱
- ※route_a_cafe.md (窓越しの距離) は `lostConnection` を使用（喫茶店目撃シーン）

## 参考
現在のroute_a系ファイル：
- route_a1.md (前編)
- route_a2.md (中編)
- route_a_cafe.md (窓越しの距離) ← 新規追加
- route_a_end.md (終章)

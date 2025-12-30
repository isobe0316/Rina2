# 音楽修正プラン - OPから第1章への移行改善

## 問題点
- **タイトルのOPテーマ** は良い雰囲気
- **第1章開始時のoffice_night.mp3** も単独では良い
- しかし連続すると **雰囲気の段差が大きすぎて違和感**

---

## 解決策

### オプション1: 第1章専用の導入曲を新規作成（推奨）

OPテーマの余韻を残しつつ、物語の世界に入るための **ブリッジ曲** を作成します。

#### 曲名: 「埋まらない差額」（物語のタイトルと同じ）

**Suno プロンプト:**
```
[Verse]
Silent office lights are fading
Numbers dancing on the screen
Empty desks and late night waiting
Nothing here is what it seems

[Pre-Chorus]
In the space between the lines
Where the truth begins to blur
Every number hides a sign
Of what we were

[Chorus]
埋まらない差額
消えない過去の傷
ガラスの向こうに映る
誰も知らない真実

[Verse 2]
Rain is falling on the window
Blurring all the city lights
In this box of glass and shadow
We are losing track of right

[Bridge - Instrumental]
(Melancholic piano with subtle strings)

[Outro]
静かな夜
始まりの予感
```

**スタイル指定:**
```
Style: Cinematic ambient, melancholic piano, subtle strings, atmospheric pad, slow tempo (70-80 BPM), Japanese lyrics in chorus, emotional vocals, neo-noir soundtrack
```

**使用タイミング:**
- story_ch1.md の冒頭
- タイトル画面から「はじめから」を押した直後

---

### オプション2: OPテーマのインストゥルメンタル版（簡易版）

OPテーマの **ボーカルなし・テンポダウン版** を作成し、物語への導入として使用。

**Suno プロンプト:**
```
Create an instrumental version of the OP theme.
- Remove all vocals
- Slow down tempo by 10-15%
- Add more atmospheric pad sounds
- Emphasize piano and strings
- Create a contemplative, mysterious mood
- Style: Neo-noir cinematic ambient
- Duration: 2-3 minutes
```

**曲名:** 「硝子の箱 - Opening Theme (Instrumental)」

---

### オプション3: 段階的な音楽設計（3曲構成）

| タイミング | 曲 | 雰囲気 |
|-----------|---|-------|
| タイトル画面 | OP Theme | 力強い、印象的 |
| 「はじめから」クリック | **新曲: Prologue** | OPの余韻を残しつつ静かに |
| 第1章中盤 | office_night.mp3 | 日常的な緊張感 |

**Prologue用プロンプト:**
```
[Intro - 30 seconds]
(Soft piano echoing the OP theme melody)
(Gradual introduction of ambient pad)
(Light rain sound effect)

[Main - 1:30]
(Contemplative piano progression)
(Subtle string accompaniment)
(Atmospheric soundscape)

[Outro - 30 seconds]
(Fade into office ambient sounds)
(Prepare transition to office_night BGM)
```

**スタイル:**
```
Style: Cinematic transition piece, ambient piano, neo-noir atmosphere, meditative tempo (65 BPM), bridge between dramatic and contemplative, no vocals, subtle rain ambience
```

**曲名:** 「Prologue - 始まりの予感」

---

## 推奨実装

### ステップ1: 新曲「埋まらない差額」を作成（オプション1）
- OPテーマの要素を部分的に引用
- より静かで内省的
- ボーカルは控えめ、または日本語のみ
- story_ch1.md 冒頭で使用

### ステップ2: audio.js の修正
```javascript
tracks: {
    op: 'audio/op_theme.mp3',
    storyOpening: 'audio/story_opening.mp3',  // ← 新曲
    officeNight: 'audio/bgm/office_night.mp3',
    // ...
}

sceneKeywords: {
    storyOpening: ['第1章: 偶然のふり', 'その数字は、偶然ではなかった'],
    // ...
}
```

### ステップ3: story_ch1.md でstoryOpeningを指定
（既存のofficeNightから切り替え）

---

## 具体的なSunoプロンプト（最終版）

### 推奨: 新曲「埋まらない差額 - Story Opening」

**Title:** 埋まらない差額 - Story Opening

**Lyrics:**
```
[Intro - Instrumental]
(Soft piano with reverb, echoing OP theme)

[Verse - Whispered/Soft Vocal]
Numbers fade into the night
Silent office, dimming light
In the space between the lines
Truth is waiting to be found

[Instrumental Break]
(Piano + subtle strings + ambient pad)

[Japanese Verse - Soft Female Vocal]
消えない数字
隠された真実
ガラスの箱の中で
静かに始まる物語

[Outro - Instrumental Fade]
(Gradual transition to ambient office sounds)
```

**Style Tags:**
```
cinematic, ambient, neo-noir soundtrack, melancholic piano, atmospheric strings, slow tempo, soft female vocals, Japanese lyrics, contemplative mood, dramatic intro, fade out ending, 70 BPM
```

**Instrumental Emphasis:**
- Piano (main)
- Strings (subtle background)
- Ambient pad
- Light rain texture

**Vocal Style:**
- Soft, contemplative
- Not overpowering
- Echoes OP theme's emotional tone
- Japanese lyrics for key moments

---

## 実装後の音楽の流れ

```
[タイトル画面]
↓ OP Theme (力強い、ドラマチック)
  「画面をクリック」
↓
↓ OP Theme 継続
  「はじめから」クリック
↓ フェードアウト (500ms)
↓
[Story Chapter 1]
↓ Story Opening (OPの余韻、静か、内省的) ← 新曲
  第1章の冒頭
↓
↓ Story Opening 継続
  物語が進む
↓
[Story Chapter 1 - 中盤以降]
↓ Office Night (日常の緊張感)
```

---

## 注意点

1. **OPテーマの要素を引用** - 完全に切り離さず、メロディの一部を残す
2. **テンポを落とす** - OPが90-100 BPMなら、新曲は70-80 BPM
3. **ボーカルは控えめ** - インストゥルメンタル中心、日本語ボーカルは効果的に
4. **長さは2-3分** - 第1章の前半をカバーできる長さ

---

## Suno生成時の設定

- **Song Mode:** Custom
- **Lyrics:** 上記の Lyrics を使用
- **Style:** 上記の Style Tags を使用
- **Duration:** 2-3 minutes
- **Instrumental Sections:** 重視（ボーカルを控えめに）

この曲を作成することで、OPテーマから第1章への移行が自然になり、違和感が解消されます。

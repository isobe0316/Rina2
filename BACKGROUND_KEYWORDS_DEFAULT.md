# 背景画像キーワード設定（初期値）

このファイルは、背景画像の自動切り替えに使用されるキーワードの初期値を記録しています。
設定画面で変更を行った場合、その内容はブラウザのローカルストレージに保存されます。

## 使い方

1. 設定画面を開く（タイトル画面の歯車アイコン）
2. 画像を選択する
3. キーワードを編集する（カンマ区切りで複数入力可能）
4. 「保存」ボタンをクリック
5. ページをリロードして反映

## 初期値一覧

### オフィス・会議室シーン

**images/office_night.jpg**
- 深夜の誰もいないフロア
- 守衛すら帰った深夜
- 残業で深夜

**images/bg_office_morning.jpg**
- 出社した朝のオフィス
- 朝のオフィスフロア

**images/bg_office_sunset.jpg**
- 夕方のオフィスに差し込む
- 退勤時間の夕焼け

**images/glass_meeting_room.jpg**
- ガラス張りの会議室B
- 外からは中がよく見える会議室

**images/meeting_room_dark_blinds.jpg**
- 第3会議室のブラインドを閉めた
- ブラインドを閉めた密室

**images/office_corridor.jpg**
- フロアの一番奥にある廃棄されたフィルキャビ
- 廃棄された廃気の間

### 資料室・システム室

**images/archive_room.jpg**
- 資料室の棚の間を抜けて
- 紙の匂いが充満する資料室

**images/event_scattered_papers.jpg**
- 散らばった資料の山
- 書類が山積みになって床に

**images/event_locked_door.jpg**
- システム管理室の鍵が掛かっている
- 鍵が掛かっているドア

### モニター・画面

**images/monitor_accounting_data.jpg**
- 長期滞留仮払金のデータが踊る
- 画面が明滅していた経理データ
- エクセルシートの異常な数字

**images/event_screen_glow.jpg**
- モニターの青白い光だけが
- 画面の光に照らされて

**images/keyboard_closeup.jpg**
- キーボードを打つ指先
- 承認ボタンをクリックした

### USB・証拠品

**images/usb_memory_hand.jpg**
- USBメモリを取り出して
- 証拠をコピーしたUSB
- データをコピーしたメモリ

### トイレ・個室

**images/toilet_stall_narrow.jpg**
- トイレの個室に鍵を掛けた
- 狭い密室のトイレ

### カフェ・外出

**images/cafe_window.jpg**
- 純喫茶「琥珀」の窓際席
- パンケーキを頼んだカフェ

**images/cafe_table_closeup.jpg**
- テーブル越しに向き合って
- カフェの席に座る

**images/train_platform.jpg**
- 駅のホームで電車を待っていた
- 改札を出た先のホーム

**images/rainy_crossing.jpg**
- 雨の交差点を渡る
- 横断歩道の白線

### 雨・窓

**images/rain_window.jpg**
- 雨音だけが部屋に響いて
- 窓を叩く雨の音
- 雨だけが降り続けていた

**images/rain_window_day.jpg**
- 雨の窓の向こう側
- 雨が降り続けている昼間

**images/bg_rain_window_evening.jpg**
- 夕方に雨が降り始める
- 雨の夕暮れの窓

**images/event_rain_macro.jpg**
- 雨粒が窓を伝う
- 雨滴がガラスを流れ落ちる

**images/water_ripples.jpg**
- 水面に広がる波紋
- 水位が上がっていく

### 破壊・事件

**images/shattered_glass.jpg**
- 硝子が割れる音
- 破壊された窓ガラス
- 炎の中で割れるガラス
- 点火した瞬間

**images/event_security_camera.jpg**
- 防犯カメラのレンズが
- 監視カメラの赤いランプ

### 室内・個人空間

**images/bedroom_night_dark.jpg**
- ベッドの中で眠れなかった
- 私の部屋の暗闇

**images/empty_desk.jpg**
- 空っぽのデスクに残された
- 荷物をまとめた後の机
- 社員証を返却した後

**images/office_locker_room.jpg**
- ロッカー室の扉を開けて
- 更衣室の静寂

### 水中・特殊

**images/underwater_room.jpg**
- 水の中に沈んでいく
- 溺れる感覚
- 水没した部屋

### 晴れ・夜

**images/bg_window_cloudy_day.jpg**
- 曇り空が広がって
- 曇った空の下

## 注意事項

- キーワードは文脈に応じて適切に設定してください
- あまり短いキーワードは頻繁に背景が切り替わる原因になります
- より長く具体的なフレーズを使用することをおすすめします
- ローカルストレージに保存された設定は、ブラウザのキャッシュクリアで削除されます

## 技術情報

- 設定は `localStorage` に `bgKeywords_[画像パス]` というキーで保存されます
- 初期値は `web/js/reader.js` の `backgroundKeywords` オブジェクトに記述されています
- 設定画面は `web/index.html` の設定モーダルから開けます

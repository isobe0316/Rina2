# 背景画像使用状況一覧

## ファイル別のデフォルト背景画像

| ファイル | 背景画像 | 説明 |
|---------|---------|------|
| story_ch1.md | bg_window_cloudy_day.jpg | 曇り空の窓 |
| story_ch2.md | bg_rain_window_evening.jpg | 夕方の雨の窓 |
| story_ch3.md | rain_window_day.jpg | 昼間の雨の窓 |
| routes/route_a1.md | office_night.jpg | 深夜のオフィス |
| routes/route_a2.md | glass_meeting_room.jpg | ガラス張り会議室 |
| routes/route_b1.md | rain_window.jpg | 雨の窓 |
| routes/route_b2.md | office_night.jpg | 深夜のオフィス |
| endings/ending_true.md | empty_desk.jpg | 空っぽのデスク |
| endings/ending_bad.md | shattered_glass.jpg | 割れたガラス |
| endings/ending_dead.md | underwater_room.jpg | 水中の部屋 |
| endings/ending_normal.md | rainy_crossing.jpg | 雨の交差点 |

## キーワード検出による動的背景画像切り替え

### オフィス・会議室シーン

| 背景画像 | 検出キーワード |
|---------|---------------|
| office_night.jpg | 深夜、誰もいないフロア、残業、守衛すら帰った |
| bg_office_morning.jpg | 出社した朝、朝のオフィス、出勤 |
| bg_office_sunset.jpg | 夕方のオフィス、退勤時間 |
| glass_meeting_room.jpg | ガラス張り会議室、会議室B、外からは中がよく見える |
| meeting_room_dark_blinds.jpg | 第3会議室、ブラインドを閉めた、密室 |
| office_corridor.jpg | 廃棄された廃気、フロアの一番奥、廃棄されたフィルキャビ |

### 資料室・システム室

| 背景画像 | 検出キーワード |
|---------|---------------|
| archive_room.jpg | 資料室、棚の間、紙の匂い |
| event_scattered_papers.jpg | 散らばった資料、書類が山積み |
| event_locked_door.jpg | システム管理室、鍵が掛かっている |

### モニター・画面

| 背景画像 | 検出キーワード |
|---------|---------------|
| monitor_accounting_data.jpg | 長期滞留仮払金、データが踊る、エクセル、画面が明滅していた |
| event_screen_glow.jpg | 画面の光、モニターの青白い光 |
| keyboard_closeup.jpg | キーボードを打つ、承認ボタン |

### USB・証拠品

| 背景画像 | 検出キーワード |
|---------|---------------|
| usb_memory_hand.jpg | USBメモリ、証拠、データをコピー |

### トイレ・個室

| 背景画像 | 検出キーワード |
|---------|---------------|
| toilet_stall_narrow.jpg | トイレの個室、狭い密室、鍵を掛けた |

### カフェ・外出

| 背景画像 | 検出キーワード |
|---------|---------------|
| cafe_window.jpg | 純喫茶「琥珀」、カフェ、パンケーキ |
| cafe_table_closeup.jpg | テーブル越しに、カフェの席 |
| train_platform.jpg | 駅のホーム、電車を待っていた |
| rainy_crossing.jpg | 横断歩道、雨の交差点 |

### 雨・窓

| 背景画像 | 検出キーワード |
|---------|---------------|
| rain_window.jpg | 雨音だけが、窓を叩く音、雨だった |
| rain_window_day.jpg | 雨の窓、雨が降り続けている |
| bg_rain_window_evening.jpg | 夕方の雨、雨が降り始める |
| event_rain_macro.jpg | 雨粒、雨滴 |
| water_ripples.jpg | 水面、波紋、水位 |

### 破壊・事件

| 背景画像 | 検出キーワード |
|---------|---------------|
| shattered_glass.jpg | 硫子が割れる、破壊、点火、炎の中で |
| event_security_camera.jpg | 防犯カメラ、監視 |

### 室内・個人空間

| 背景画像 | 検出キーワード |
|---------|---------------|
| bedroom_night_dark.jpg | ベッドの中で、眠れなかった、私の部屋 |
| empty_desk.jpg | 空っぽのデスク、荷物をまとめた、社員証を返却 |
| office_locker_room.jpg | ロッカー室、更衣室 |

### 水中・特殊

| 背景画像 | 検出キーワード |
|---------|---------------|
| underwater_room.jpg | 水の中、沈んでいく、溺れる |

### 晴れ・夜

| 背景画像 | 検出キーワード |
|---------|---------------|
| bg_window_cloudy_day.jpg | 曇り空、曇った空 |
| bg_window_clear_night.jpg | 清澄な夜空、星が見える |

## 注意点

- 背景画像は本文中のキーワードを検出して自動的に切り替わります
- 複数のキーワードが一致する場合、最初に一致した画像が使用されます
- デフォルト背景はファイルの冒頭で設定され、キーワード検出により上書きされます
- スクロール位置に応じて動的に切り替わるため、同じファイル内で複数の背景画像が表示される場合があります

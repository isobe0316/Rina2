// ========== 音楽管理システム ==========

class AudioManager {
    constructor() {
        this.bgm = null;
        this.currentBGM = null;
        this.fadeInterval = null;
        this.volume = 0.3; // デフォルト音量
        this.enabled = true;
        
        // OP曲のプレイリスト管理
        this.opPlaylist = ['op1', 'op2', 'op3'];
        this.playedOpTracks = []; // 再生済みトラック
        this.isOpMode = false; // OPモードかどうか
        
        // 音楽ファイルの定義
        this.tracks = {
            // === 歌（ボーカル入り）===
            // OPテーマ3種（ランダム再生）
            op1: 'audio/op_theme_1.mp3',                      // OPテーマ1: 硫子の箱
            op2: 'audio/op_theme_2.mp3',                      // OPテーマ2: 沈黙の重量
            op3: 'audio/op_theme_3.mp3',                      // OPテーマ3: 真実の代償
            op: 'audio/op_theme.mp3',                         // 旧OPテーマ（互換性のため残す）
            storyOpening: 'audio/story_opening.mp3',          // ストーリー導入曲
            choiceMoment: 'audio/choice_moment.mp3',          // 挿入歌：運命の分岐点
            trueEnd: 'audio/true_ed.mp3',                     // True EDテーマ：雨上がりの別れ
            badDeadEnd: 'audio/bad_dead_ed.mp3',              // Bad/Dead EDテーマ：水位と沈殿
            ashCradle: 'audio/ash_cradle.mp3',                // Bad EDテーマ：灰のゆりかご
            misakiBoxTheme: 'audio/misaki_box_theme.mp3',     // 美咲の箱テーマ：盾にならない箱
            
            // === メインストーリー用BGM 8曲 ===
            officeNight: 'audio/bgm/office_night.mp3',        // オフィスの夜
            archiveRoom: 'audio/bgm/archive_room.mp3',        // 資料室
            meetingRoomB: 'audio/bgm/meeting_room_b.mp3',     // 会議室B
            tensionRising: 'audio/bgm/tension_rising.mp3',    // 緊張の高まり
            decisionMoment: 'audio/bgm/decision_moment.mp3',  // 決断の瞬間
            rainBegins: 'audio/bgm/rain_begins.mp3',          // 雨が降り始める
            boxRevealed: 'audio/bgm/box_revealed.mp3',        // 箱が明かされる
            afterMeeting: 'audio/bgm/after_meeting.mp3',      // 会議後
            
            // === 新ストーリー用BGM ===
            midnightAnxiety: 'audio/bgm/midnight_anxiety.mp3',     // 深夜の不安
            cafeConfrontation: 'audio/bgm/cafe_confrontation.mp3', // カフェでの対峙
            paranoiaOffice: 'audio/bgm/paranoia_office.mp3',       // 疑心暗鬼のオフィス
            twistedBond: 'audio/bgm/twisted_bond.mp3',             // 歪んだ絆
            rainyPressure: 'audio/bgm/rainy_pressure.mp3',         // 雨と圧力
            confinedIntimacy: 'audio/bgm/confined_intimacy.mp3',   // 密室の親密
            
            // === キャラクター・回想用BGM 4曲 ===
            misakiMemory: 'audio/bgm/misaki_memory.mp3',      // 美咲の記憶
            rinaTheme: 'audio/bgm/rina_theme.mp3',            // 梨奈のテーマ
            akutoSolitude: 'audio/bgm/akuto_solitude.mp3',    // 亜久斗の孤独
            lostConnection: 'audio/bgm/lost_connection.mp3',  // 失われた繋がり
            
            // === システム・過去の人物用BGM 4曲 ===
            systemRoom: 'audio/bgm/system_room.mp3',          // システム管理室
            boxCreator: 'audio/bgm/box_creator.mp3',          // 箱を作った人
            saekiConflict: 'audio/bgm/saeki_conflict.mp3',    // 佐伯の葛藤
            gearsTurning: 'audio/bgm/gear_turning.mp3',       // 歯車が回る
            
            // === ルート・分岐用BGM 3曲 ===
            beforeChoice: 'audio/bgm/before_choice.mp3',      // 分岐の予感
            routeAShield: 'audio/bgm/route_a_shield.mp3',     // ルートA：盾にならない
            routeBWords: 'audio/bgm/entrusted_words.mp3',     // ルートB：預かった言葉（新曲）
            entrustedWords: 'audio/bgm/entrusted_words.mp3',  // 預かった言葉（エイリアス）
            
            // === エンディング手前用BGM 3曲 ===
            truthApproaches: 'audio/bgm/truth_approaches.mp3', // 真実が近づく
            sinkingTogether: 'audio/bgm/sinking_together.mp3', // 共に沈む
            brokenBeauty: 'audio/bgm/broken_beauty.mp3'        // きれいに壊れる
        };
        
        // シーン別BGMマッピング（キーワード検出用）
        this.sceneKeywords = {
            // ストーリー導入
            storyOpening: ['第1章: 偶然のふり', 'その数字は、偶然ではなかった'],
            
            // 第1章
            officeNight: ['3月28日 金曜日 21:00', 'オフィスの空調が切れた', '犬飼健太'],
            midnightAnxiety: ['3月29日 土曜日 深夜', '眠れなかった', 'ベッドの中で'],
            cafeConfrontation: ['3月30日 日曜日 11:00', '純喫茶「琥珀」', 'パンケーキ'],
            
            // 第2章: ガラス張りの牢獄
            twistedBond: ['第2章: ガラス張りの牢獄', '地獄のような三日間', '疑心暗鬼'],
            paranoiaOffice: ['4月1日 月曜日', '出社した朝', '犬飼課長に呼び出された'],
            meetingRoomB: ['4月2日 水曜日 20:00', 'ガラス張り会議室B', '外からは中がよく見える'],
            
            // 第3章: 狭い密室
            decisionMoment: ['第3章: 狭い密室', '4月中旬', '雨が降り続いている'],
            rainyPressure: ['第3会議室', 'ブラインドを閉めた', '犬飼課長'],
            confinedIntimacy: ['トイレの個室', '狭い密室', 'USBメモリ'],
            decisionMoment: ['決意', '雨にまみれた', '運命の選択'],
            
            // 旧ストーリー（互換性のため残す）
            archiveRoom: ['資料室', '棚の間', '背表紙', '紙の匂い'],
            tensionRising: ['承認ボタン', '十八時が締切', '承認待ち', 'カーソルが止まった'],
            rainBegins: ['雨だった', '窓を叩く音', '翌週の月曜'],
            boxRevealed: ['箱は、もう箱ではない', '意味を持ち始める'],
            afterMeeting: ['会議は、結論を出さなかった', '沈黙が落ちる'],
            
            // キャラクター
            misakiMemory: ['美咲', '恋人だった', 'FP&A', '二度目は、違った'],
            rinaTheme: ['宮本梨奈', '新人として', '観察力が鋭く'],
            akutoSolitude: ['亜久斗', '一人で抱えてきた', '見ないふりを続けてきた'],
            lostConnection: ['梨奈は、何も知らなかった', '知らされていない'],
            
            // システム・過去の人物
            systemRoom: ['システム管理室', '戸川', '誰も責任を持たない端末'],
            boxCreator: ['箱を作った人', '定年退職', '制度が変わる前日'],
            saekiConflict: ['佐伯', '監査室', '意味を与えなかった'],
            gearsTurning: ['歯車', '噛み合った音', '回り始めている'],
            
            // 分岐・ルート
            beforeChoice: ['どこまで彼女に付き合うのか', 'まだ決められずにいる'],
            
            // ルートA1: 偽造作業の緊張と密室の親密
            confinedIntimacy: ['沈黙の愛', '偽りの契約', '紙は、一度くしゃくしゃに', 'インクを使い', '震える手で、架空の署名'],
            
            // ルートA2: 裏切りと殺意の爆発
            sinkingTogether: ['紅蓮の決算', '殺意の期限', '辞令だ', '北関東物流センター', '札幌支店', '用済みのゴミ', '火花が散った瞬間', '重厚なガラス製の灰皿', 'UPS（無停電電源装置）'],
            
            routeBWords: ['自首する', '内部監査室に行く', '一文字を', '告発・正義'],
            twistedBond: ['共犯作業', '背徳的な高揚感', '秘密の儀式'],
            
            // エンディング手前
            truthApproaches: ['トゥルー', '箱が生まれない場所', '承認経路を整理'],
            brokenBeauty: ['バッド', '依存が', 'きれいに壊れる']
        };
    }
    
    // 音楽を再生
    play(trackName, options = {}) {
        if (!this.enabled) return;
        
        const {
            loop = true,
            fadeIn = true,
            fadeOut = true,
            volume = this.volume
        } = options;
        
        // 'op'が指定された場合はランダムにOPテーマを選択
        if (trackName === 'op') {
            this.isOpMode = true;
            trackName = this.getNextOpTrack();
            console.log(`OP theme selected: ${trackName}`);
        }
        
        const trackPath = this.tracks[trackName];
        if (!trackPath) {
            console.warn(`Track not found: ${trackName}`);
            return;
        }
        
        // 同じトラックなら何もしない
        if (this.currentBGM === trackName && this.bgm && !this.bgm.paused) {
            return;
        }
        
        // 現在のBGMをフェードアウト
        if (this.bgm && fadeOut) {
            this.fadeOut(() => {
                this.loadAndPlay(trackPath, trackName, loop, fadeIn, volume);
            });
        } else {
            if (this.bgm) {
                this.bgm.pause();
            }
            this.loadAndPlay(trackPath, trackName, loop, fadeIn, volume);
        }
    }
    
    // 次のOPトラックを取得（重複なし）
    getNextOpTrack() {
        // すべて再生済みならリセット
        if (this.playedOpTracks.length >= this.opPlaylist.length) {
            this.playedOpTracks = [];
        }
        
        // 未再生の曲からランダム選択
        const availableTracks = this.opPlaylist.filter(track => !this.playedOpTracks.includes(track));
        const selectedTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)];
        this.playedOpTracks.push(selectedTrack);
        
        return selectedTrack;
    }
    
    // 音楽を読み込んで再生
    loadAndPlay(path, trackName, loop, fadeIn, volume) {
        this.bgm = new Audio(path);
        this.bgm.loop = this.isOpMode ? false : loop; // OPモードではループしない
        this.bgm.volume = fadeIn ? 0 : volume;
        this.currentBGM = trackName;
        
        // OPモードで曲が終わったら次の曲を再生
        if (this.isOpMode) {
            this.bgm.addEventListener('ended', () => {
                console.log('OP track ended, playing next...');
                const nextTrack = this.getNextOpTrack();
                const nextPath = this.tracks[nextTrack];
                this.loadAndPlay(nextPath, nextTrack, false, true, this.volume);
            });
        }
        
        this.bgm.play().then(() => {
            if (fadeIn) {
                this.fadeIn(volume);
            }
        }).catch(err => {
            console.warn('Audio playback failed:', err);
        });
    }
    
    // フェードイン
    fadeIn(targetVolume, duration = 2000) {
        if (!this.bgm) return;
        
        clearInterval(this.fadeInterval);
        const step = targetVolume / (duration / 50);
        
        this.fadeInterval = setInterval(() => {
            if (this.bgm.volume < targetVolume - step) {
                this.bgm.volume += step;
            } else {
                this.bgm.volume = targetVolume;
                clearInterval(this.fadeInterval);
            }
        }, 50);
    }
    
    // フェードアウト
    fadeOut(callback, duration = 1500) {
        if (!this.bgm) {
            if (callback) callback();
            return;
        }
        
        clearInterval(this.fadeInterval);
        const step = this.bgm.volume / (duration / 50);
        
        this.fadeInterval = setInterval(() => {
            if (this.bgm.volume > step) {
                this.bgm.volume -= step;
            } else {
                this.bgm.volume = 0;
                this.bgm.pause();
                clearInterval(this.fadeInterval);
                if (callback) callback();
            }
        }, 50);
    }
    
    // 停止
    stop(fadeOut = true) {
        clearInterval(this.fadeInterval);
        if (fadeOut) {
            this.fadeOut();
        } else {
            if (this.bgm) {
                this.bgm.pause();
                this.bgm.currentTime = 0;
                this.bgm = null;
            }
        }
        this.currentBGM = null;
    }
    
    // 音量変更
    setVolume(volume) {
        this.volume = volume;
        if (this.bgm) {
            this.bgm.volume = volume;
        }
    }
    
    // ON/OFF切り替え
    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stop();
        }
        return this.enabled;
    }
    
    // シーン自動検出
    detectScene(content) {
        for (const [scene, keywords] of Object.entries(this.sceneKeywords)) {
            for (const keyword of keywords) {
                if (content.includes(keyword)) {
                    return scene;
                }
            }
        }
        return 'officeNight'; // デフォルト
    }
    
    // コンテンツに応じて自動再生
    autoPlay(content) {
        const scene = this.detectScene(content);
        this.play(scene);
    }
}

// グローバルインスタンス
const audioManager = new AudioManager();

// 音楽コントロールUIを追加
function initAudioControls() {
    const controlsHTML = `
        <div class="audio-controls">
            <button id="audio-toggle" class="audio-btn" title="音楽 ON/OFF">
                <span class="audio-icon">🔊</span>
            </button>
            <input type="range" id="volume-slider" min="0" max="100" value="30" class="volume-slider" title="音量">
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', controlsHTML);
    
    // イベントリスナー
    const toggleBtn = document.getElementById('audio-toggle');
    const volumeSlider = document.getElementById('volume-slider');
    
    toggleBtn.addEventListener('click', () => {
        const enabled = audioManager.toggle();
        toggleBtn.querySelector('.audio-icon').textContent = enabled ? '🔊' : '🔇';
    });
    
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        audioManager.setVolume(volume);
    });
}

// ページ読み込み時に初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudioControls);
} else {
    initAudioControls();
}

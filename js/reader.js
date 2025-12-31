// reader.html用のJavaScript

let currentFile = '';
let currentSections = [];
let currentSectionIndex = 0;

// ========== 背景画像管理 ==========
// コンテンツキーワードに応じた背景画像マッピング
const backgroundKeywords = {
    // オフィス・会議室シーン
    'images/office_night.jpg': ['深夜の誰もいないフロア', '守衛すら帰った深夜', '残業で深夜'],
    'images/bg_office_morning.jpg': ['出社した朝のオフィス', '朝のオフィスフロア'],
    'images/bg_office_sunset.jpg': ['夕方のオフィスに差し込む', '退勤時間の夕焼け'],
    'images/glass_meeting_room.jpg': ['4月2日 水曜日 20:00', '外からは中がよく見える会議室'],
    'images/meeting_room_dark_blinds.jpg': ['第3会議室のブラインドを閉めた', 'ブラインドを閉めた密室'],
    'images/office_corridor.jpg': ['フロアの一番奥にある廃棄されたフィルキャビ', '廃棄された廃気の間'],
    
    // 資料室・システム室
    'images/archive_room.jpg': ['資料室の棚の間を抜けて', '紙の匂いが充満する資料室'],
    'images/event_scattered_papers.jpg': ['散らばった資料の山', '書類が山積みになって床に'],
    'images/event_locked_door.jpg': ['システム管理室の鍵が掛かっている', '鍵が掛かっているドア'],
    
    // モニター・画面
    'images/monitor_accounting_data.jpg': ['長期滞留仮払金のデータが踊る', '画面が明滅していた経理データ', 'エクセルシートの異常な数字'],
    'images/event_screen_glow.jpg': ['モニターの青白い光だけが', '画面の光に照らされて'],
    'images/keyboard_closeup.jpg': ['Enterキーを押す音が、銃声のように響いた。', '承認ボタンをクリックした'],
    
    // USB・証拠品
    'images/usb_memory_hand.jpg': ['私は上着の内ポケットから、USBメモリを取り出した', '証拠をコピーしたUSB', 'データをコピーしたメモリ'],
    
    // トイレ・個室
    'images/toilet_stall_narrow.jpg': ['トイレの個室に鍵を掛けた', '狭い密室のトイレ'],
    
    // カフェ・外出
    'images/cafe_window.jpg': ['パンケーキを頼んだカフェ', 'パンケーキを頼んだカフェ'],
    'images/cafe_table_closeup.jpg': ['3月30日 日曜日 11:00', 'カフェの席に座る'],
    'images/train_platform.jpg': ['駅のホームで電車を待っていた', '改札を出た先のホーム'],
    'images/rainy_crossing.jpg': ['雨の交差点を渡る', '横断歩道の白線'],
    
    // 雨・窓
    'images/rain_window.jpg': ['雨音だけが部屋に響いて', '窓を叩く雨の音', '雨だけが降り続けていた'],
    'images/rain_window_day.jpg': ['雨の窓の向こう側', '雨が降り続けている昼間'],
    'images/bg_rain_window_evening.jpg': ['夕方に雨が降り始める', '雨の夕暮れの窓'],
    'images/event_rain_macro.jpg': ['雨粒が窓を伝う', '雨滴がガラスを流れ落ちる'],
    'images/water_ripples.jpg': ['水面に広がる波紋', '水位が上がっていく'],
    
    // 破壊・事件
    'images/shattered_glass.jpg': ['硝子が割れる音', '破壊された窓ガラス', '炎の中で割れるガラス', '点火した瞬間'],
    'images/event_security_camera.jpg': ['防犯カメラのレンズが', '監視カメラの赤いランプ'],
    
    // 室内・個人空間
    'images/bedroom_night_dark.jpg': ['3月29日 土曜日 深夜', '私の部屋の暗闇'],
    'images/empty_desk.jpg': ['空っぽのデスクに残された', '荷物をまとめた後の机', '社員証を返却した後'],
    'images/office_locker_room.jpg': ['ロッカー室の扉を開けて', '更衣室の静寂'],
    
    // 水中・特殊
    'images/underwater_room.jpg': ['水の中に沈んでいく', '溺れる感覚', '水没した部屋'],
    
    // 晴れ・夜
    'images/bg_window_cloudy_day.jpg': ['曇り空が広がって', '曇った空の下'],
    'images/bg_window_clear_night.jpg': ['3月28日 金曜日 21:00', '星が見える']
};

// ファイルごとのデフォルト背景画像マッピング
const backgroundImages = {
    'story_ch1.md': 'images/bg_window_cloudy_day.jpg',
    'story_ch2.md': 'images/bg_rain_window_evening.jpg',
    'story_ch3.md': 'images/rain_window_day.jpg',
    'routes/route_a1.md': 'images/office_night.jpg',
    'routes/route_a2.md': 'images/glass_meeting_room.jpg',
    'routes/route_b1.md': 'images/rain_window.jpg',
    'routes/route_b2.md': 'images/office_night.jpg',
    'endings/ending_true.md': 'images/empty_desk.jpg',
    'endings/ending_bad.md': 'images/shattered_glass.jpg',
    'endings/ending_dead.md': 'images/underwater_room.jpg',
    'endings/ending_normal.md': 'images/rainy_crossing.jpg'
};

// 背景画像を変更するヘルパー関数
function changeBg(imagePath) {
    const bgLayer = document.getElementById('bg-image');
    if (bgLayer) {
        bgLayer.style.backgroundImage = `url('${imagePath}')`;
        console.log('Background changed to:', imagePath);
    }
}

// デフォルト背景に戻す
function resetBg() {
    const bgLayer = document.getElementById('bg-image');
    if (bgLayer) {
        bgLayer.style.backgroundImage = '';
    }
}

// 現在のファイルに応じて背景画像を設定
function setBackgroundForFile(filePath) {
    if (backgroundImages[filePath]) {
        changeBg(backgroundImages[filePath]);
    } else {
        console.log('No background image defined for:', filePath);
    }
}

// コンテンツのキーワードに応じて背景画像を検出
function detectBackgroundFromContent(content) {
    for (const [imagePath, keywords] of Object.entries(backgroundKeywords)) {
        // ローカルストレージから保存されたキーワードを確認
        const savedKeywords = localStorage.getItem('bgKeywords_' + imagePath);
        const keywordList = savedKeywords ? savedKeywords.split(',').map(k => k.trim()) : keywords;
        
        for (const keyword of keywordList) {
            if (content.includes(keyword)) {
                return imagePath;
            }
        }
    }
    return null;
}

// 背景画像の状態管理
let lastDetectedBackground = null;
let lastActivityTime = Date.now();
let inactivityTimer = null;

// スクロール位置に応じて背景画像を動的に切り替え
function updateBackgroundOnScroll() {
    const content = document.getElementById('content');
    if (!content) return;
    
    // アクティビティを記録
    lastActivityTime = Date.now();
    
    // 1分間の非アクティブタイマーをリセット
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
    }
    inactivityTimer = setTimeout(() => {
        // 1分間動きがなかったらデフォルト背景に戻る
        lastDetectedBackground = null;
        const defaultBg = getDefaultBackground(currentFile);
        if (defaultBg) {
            changeBg(defaultBg);
        }
    }, 60000); // 60秒
    
    // 現在表示されている文章ブロックを取得
    const paragraphs = content.querySelectorAll('p, h2, h3');
    let visibleText = '';
    
    paragraphs.forEach(p => {
        const rect = p.getBoundingClientRect();
        // ビューポートの中央付近にある要素を優先
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            visibleText += p.textContent + ' ';
        }
    });
    
    // キーワードから背景画像を検出
    const detectedBg = detectBackgroundFromContent(visibleText);
    if (detectedBg && detectedBg !== lastDetectedBackground) {
        // 新しい背景が検出された場合は切り替え
        lastDetectedBackground = detectedBg;
        changeBg(detectedBg);
        console.log('Background changed to:', detectedBg);
    }
}

// グローバル関数として公開（必要に応じて手動で変更できるように）
window.changeBg = changeBg;
window.resetBg = resetBg;

// URLパラメータからファイル名を取得
function getFileFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('file') || 'story.md';
}

// マークダウンファイルを読み込む
async function loadMarkdown(filePath) {
    try {
        // 相対パスはそのまま使用（web/フォルダ内から読み込む）
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`ファイルの読み込みに失敗しました: ${response.status}`);
        }
        
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error loading markdown:', error);
        return `# エラー\n\nファイルの読み込みに失敗しました。\n\nパス: ${filePath}\n\nエラー: ${error.message}`;
    }
}

// マークダウンをHTMLに変換して表示
async function renderMarkdown() {
    // 前のページのBGMを停止
    if (typeof audioManager !== 'undefined') {
        audioManager.stop(true);
    }
    
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<div class="loading">読み込み中...</div>';
    
    currentFile = getFileFromURL();
    const markdown = await loadMarkdown(currentFile);
    
    // 演出コマンドを処理
    const processedMarkdown = processEffectCommands(markdown);
    
    // markedでHTMLに変換
    const html = marked.parse(processedMarkdown);
    contentDiv.innerHTML = html;
    
    // 怖いメッセージに特殊効果を追加
    applyHorrorTextEffects();
    
    // 背景画像を設定
    setBackgroundForFile(currentFile);
    
    // セクションに分割（h2タグで分割）
    splitIntoSections();
    
    // 次のセクションボタンの状態を確認
    checkForwardButton();
    
    // URLハッシュがある場合はそこへスクロール
    if (window.location.hash) {
        setTimeout(() => {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        // スクロール位置をリセット
        window.scrollTo(0, 0);
    }
    
    // スクロール進捗を更新
    updateScrollProgress();
    
    // 選択肢リンクにBGM停止イベントを追加
    addChoiceButtonListeners();
    
    // スクロール時に背景画像を動的に切り替え
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateBackgroundOnScroll();
        }, 200);
    });
    
    // 音楽を自動再生（コンテンツに応じて）
    if (typeof audioManager !== 'undefined') {
        playMusicForContent(markdown, currentFile);
    }
}

// 選択肢ボタンにBGM停止イベントを追加
function addChoiceButtonListeners() {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    choiceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 外部リンクの場合はBGMを停止
            const href = button.getAttribute('href');
            if (href && (href.startsWith('reader.html') || !href.startsWith('#'))) {
                if (typeof audioManager !== 'undefined') {
                    audioManager.stop(false); // 即座に停止
                }
                // 遷移先で履歴があることを示すフラグを設定
                sessionStorage.setItem('hasHistory', 'true');
                sessionStorage.removeItem('canGoForward');
            }
        });
    });
}

// コンテンツとファイル名に応じて音楽を再生
function playMusicForContent(content, filePath) {
    if (typeof audioManager === 'undefined') return;
    
    // 短い待機時間の後に音楽を再生（前の音楽の停止を確実にする）
    setTimeout(() => {
        // エンディングファイルの場合
        if (filePath.includes('ending_true')) {
            audioManager.play('trueEnd', { loop: false, fadeIn: true });
            return;
        }
        if (filePath.includes('ending_bad') || filePath.includes('ending_dead')) {
            audioManager.play('badDeadEnd', { loop: false, fadeIn: true });
            return;
        }
        
        // ルートファイルの場合
        // route_a_cafe.md は別のBGM
        if (filePath.includes('route_a_cafe')) {
            audioManager.play('lostConnection', { loop: true });
            return;
        }
        if (filePath.includes('route_a1')) {
            audioManager.play('confinedIntimacy', { loop: true });
            return;
        }
        if (filePath.includes('route_a2')) {
            audioManager.play('sinkingTogether', { loop: true });
            return;
        }
        if (filePath.includes('route_a')) {
            audioManager.play('misakiBoxTheme', { loop: true });
            return;
        }
        if (filePath.includes('route_b')) {
            audioManager.play('routeBWords', { loop: true });
            return;
        }
        
        // メインストーリー：コンテンツから自動検出
        audioManager.autoPlay(content);
    }, 500);
}

// コンテンツをセクションに分割（履歴ベースのナビゲーション用）
function splitIntoSections() {
    // ページ履歴ベースのナビゲーションに変更
    updateHistoryButtons();
}

// 履歴ボタンの状態を更新
function updateHistoryButtons() {
    const prevBtn = document.getElementById('prev-section');
    const nextBtn = document.getElementById('next-section');
    
    // 前のセクション（戻る）は履歴があれば有効
    // ページ読み込み直後はwindow.history.lengthが更新されていないため、
    // sessionStorageで履歴の有無を管理
    const hasHistory = sessionStorage.getItem('hasHistory') === 'true';
    prevBtn.disabled = !hasHistory;
    
    // 次のセクション（進む）は戻った後のみ有効
    const canGoForward = sessionStorage.getItem('canGoForward') === 'true';
    nextBtn.disabled = !canGoForward;
}

// 前のセクションへ（履歴を戻る）
function goToPrevSection() {
    // 戻る前に次のセクションを有効化するフラグをセット
    sessionStorage.setItem('canGoForward', 'true');
    // hasHistoryは削除しない（戻った先でも履歴は存在する）
    window.history.back();
}

// 次のセクションへ（履歴を進む）
function goToNextSection() {
    // sessionStorageのフラグを確認
    if (sessionStorage.getItem('canGoForward') === 'true') {
        sessionStorage.removeItem('canGoForward');
        sessionStorage.setItem('hasHistory', 'true');
        window.history.forward();
    }
}

// ページ読み込み後に履歴ボタンの状態を確認
function checkForwardButton() {
    // canGoForwardフラグがある場合は、戻ってきたページなので何もしない
    if (sessionStorage.getItem('canGoForward') === 'true') {
        return;
    }
    
    // 新規遷移の場合、履歴を設定
    // index.htmlからの最初のページかどうかをチェック
    const referrer = document.referrer;
    const isFromIndex = referrer.includes('index.html') || referrer === '';
    const isFromSameDomain = referrer.includes(window.location.hostname) || referrer === '';
    
    // 同じドメイン内の遷移で、index.htmlからでない場合は履歴あり
    if (isFromSameDomain && !isFromIndex) {
        sessionStorage.setItem('hasHistory', 'true');
    } else if (!isFromSameDomain && referrer !== '') {
        // 外部からの遷移の場合も履歴なし
        sessionStorage.removeItem('hasHistory');
    }
    // index.htmlからの場合は hasHistory を設定しない（初回ページ）
}

// スクロール進捗を更新
function updateScrollProgress() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);
    const clampedPercent = Math.max(0, Math.min(100, scrollPercent));
    
    document.getElementById('scroll-progress').textContent = `${clampedPercent}%`;
    
    // プログレスバーも更新
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
        progressBar.value = clampedPercent;
    }
}

// イベントリスナー設定
document.getElementById('prev-section').addEventListener('click', goToPrevSection);
document.getElementById('next-section').addEventListener('click', goToNextSection);

// 音量コントロール
const volumeSlider = document.getElementById('volume');
if (volumeSlider && typeof audioManager !== 'undefined') {
    // 保存されている値を復元
    const savedVolume = localStorage.getItem('bgmVolume');
    if (savedVolume !== null) {
        volumeSlider.value = savedVolume;
        audioManager.volume = savedVolume / 100;
        if (audioManager.bgm) {
            audioManager.bgm.volume = audioManager.volume;
        }
    }
    
    volumeSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        audioManager.volume = value / 100;
        if (audioManager.bgm) {
            audioManager.bgm.volume = audioManager.volume;
        }
        localStorage.setItem('bgmVolume', value);
    });
}

// 背景透過度コントロール
const bgOpacitySlider = document.getElementById('bg-opacity');
if (bgOpacitySlider) {
    // 保存されている値を復元
    const savedOpacity = localStorage.getItem('bgOpacity');
    if (savedOpacity !== null) {
        bgOpacitySlider.value = savedOpacity;
        updateBgOpacity(savedOpacity);
    }
    
    bgOpacitySlider.addEventListener('input', (e) => {
        const value = e.target.value;
        updateBgOpacity(value);
        localStorage.setItem('bgOpacity', value);
    });
}

function updateBgOpacity(value) {
    const bgLayer = document.getElementById('bg-image');
    const contentDiv = document.getElementById('content');
    
    if (bgLayer && contentDiv) {
        if (value >= 100) {
            // 100の場合は文字を完全に消して背景のみ表示
            contentDiv.style.opacity = '0';
            bgLayer.style.opacity = '1';
            const style = document.getElementById('bg-opacity-style') || document.createElement('style');
            style.id = 'bg-opacity-style';
            style.textContent = `.bg-layer::after { background: rgba(10, 14, 20, 0) !important; }`;
            if (!document.getElementById('bg-opacity-style')) {
                document.head.appendChild(style);
            }
        } else {
            // 通常の透過度調整（0-99）
            contentDiv.style.opacity = '1';
            const opacity = value / 100;
            const style = document.getElementById('bg-opacity-style') || document.createElement('style');
            style.id = 'bg-opacity-style';
            style.textContent = `.bg-layer::after { background: rgba(10, 14, 20, ${opacity}) !important; }`;
            if (!document.getElementById('bg-opacity-style')) {
                document.head.appendChild(style);
            }
        }
    }
}

// 背景表示ボタン
const bgViewBtn = document.getElementById('bg-view-btn');
if (bgViewBtn) {
    let isViewingBg = false;
    let previousOpacity = bgOpacitySlider ? bgOpacitySlider.value : 50;
    
    const iconImage = bgViewBtn.querySelector('.icon-image');
    const iconClose = bgViewBtn.querySelector('.icon-close');
    
    bgViewBtn.addEventListener('click', () => {
        const contentDiv = document.getElementById('content');
        const readerControls = document.querySelector('.reader-controls');
        const volumeControl = document.querySelector('.volume-control');
        const bgOpacityControl = document.querySelector('.bg-opacity-control');
        const readerNav = document.querySelector('.reader-nav');
        
        if (!isViewingBg) {
            // 背景表示モード
            previousOpacity = bgOpacitySlider ? bgOpacitySlider.value : 50;
            if (bgOpacitySlider) {
                bgOpacitySlider.value = 100;
                updateBgOpacity(100);
            }
            if (contentDiv) contentDiv.style.display = 'none';
            if (readerControls) readerControls.style.display = 'none';
            if (volumeControl) volumeControl.style.display = 'none';
            if (bgOpacityControl) bgOpacityControl.style.display = 'none';
            if (readerNav) readerNav.style.opacity = '0.3';
            
            // アイコンを切り替え
            if (iconImage) iconImage.style.display = 'none';
            if (iconClose) iconClose.style.display = 'block';
            bgViewBtn.title = '戻る';
            isViewingBg = true;
        } else {
            // 通常モードに戻る
            if (bgOpacitySlider) {
                bgOpacitySlider.value = previousOpacity;
                updateBgOpacity(previousOpacity);
            }
            if (contentDiv) contentDiv.style.display = 'block';
            if (readerControls) readerControls.style.display = 'flex';
            if (volumeControl) volumeControl.style.display = 'flex';
            if (bgOpacityControl) bgOpacityControl.style.display = 'flex';
            if (readerNav) readerNav.style.opacity = '1';
            
            // アイコンを切り替え
            if (iconImage) iconImage.style.display = 'block';
            if (iconClose) iconClose.style.display = 'none';
            bgViewBtn.title = '背景画像のみを表示';
            isViewingBg = false;
        }
    });
}

// スクロール時に進捗を更新
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateScrollProgress, 100);
});

// キーボードショートカット
document.addEventListener('keydown', (e) => {
    const prevBtn = document.getElementById('prev-section');
    const nextBtn = document.getElementById('next-section');
    
    if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
        goToPrevSection();
    } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
        goToNextSection();
    }
});

// ページ遷移時にBGMを停止
window.addEventListener('beforeunload', () => {
    if (typeof audioManager !== 'undefined') {
        audioManager.stop(false); // 即座に停止
    }
});

window.addEventListener('pagehide', () => {
    if (typeof audioManager !== 'undefined') {
        audioManager.stop(false); // 即座に停止
    }
});

// すべてのリンククリック時に音楽を停止
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href) {
        if (typeof audioManager !== 'undefined') {
            audioManager.stop(false);
        }
    }
});

// ページ読み込み時に実行
window.addEventListener('DOMContentLoaded', renderMarkdown);

// ========== 演出機能 ==========

// 演出キーワードと音声ファイルのマッピング定義
const SOUND_ASSETS = {
    '風': 'audio/bgm/wind.mp3',
    '砕く': 'audio/bgm/crack.mp3',
    '炎': 'audio/bgm/fire.mp3',
    'ピアノ': 'audio/bgm/piano_sad.mp3',
    'ノイズ': 'audio/bgm/noise.mp3'
};

// 演出コマンドを処理（マークダウンから演出行を抽出して実行）
function processEffectCommands(markdown) {
    const lines = markdown.split('\n');
    const processedLines = [];
    
    for (let line of lines) {
        // （※ で始まる行は演出コマンドとして処理
        if (line.trim().startsWith('（※')) {
            // 演出を実行
            executeEffect(line);
            // この行は表示しない（HTMLに含めない）
            continue;
        }
        processedLines.push(line);
    }
    
    return processedLines.join('\n');
}

// 演出実行関数
function executeEffect(cmdText) {
    const overlay = document.getElementById('visual-overlay');
    const effectBgm = document.getElementById('effect-bgm');
    const effectSe = document.getElementById('effect-se');

    console.log("演出実行:", cmdText);

    // --- 画面演出 ---
    
    // 暗転
    if (cmdText.includes('暗転')) {
        overlay.className = 'mode-blackout';
    }
    // ノイズ
    else if (cmdText.includes('ノイズ')) {
        overlay.className = 'mode-noise';
        setTimeout(() => { overlay.className = ''; }, 500);
    }
    // 演出解除（明転など）
    else if (cmdText.includes('明転') || cmdText.includes('止む')) {
        overlay.className = '';
    }

    // --- 音声演出 ---

    // BGM: ピアノ
    if (cmdText.includes('ピアノ') && SOUND_ASSETS['ピアノ']) {
        effectBgm.src = SOUND_ASSETS['ピアノ'];
        effectBgm.volume = 0.5;
        effectBgm.play();
    }
    // SE: 風
    if (cmdText.includes('風') && SOUND_ASSETS['風']) {
        effectBgm.src = SOUND_ASSETS['風'];
        effectBgm.play();
    }
    // SE: 砕く音
    if (cmdText.includes('砕く') && SOUND_ASSETS['砕く']) {
        effectSe.src = SOUND_ASSETS['砕く'];
        effectSe.play();
    }
    // SE: 炎
    if (cmdText.includes('炎') && SOUND_ASSETS['炎']) {
        effectBgm.src = SOUND_ASSETS['炎'];
        effectBgm.play();
    }
    
    // 音停止
    if (cmdText.includes('止') || cmdText.includes('静寂')) {
        effectBgm.pause();
        effectSe.pause();
    }
}

// 怖いメッセージに特殊効果を適用
function applyHorrorTextEffects() {
    const contentDiv = document.getElementById('content');
    if (!contentDiv) return;
    
    // 全ての<strong>タグを取得
    const strongTags = contentDiv.querySelectorAll('strong');
    
    console.log('Total strong tags found:', strongTags.length);
    
    strongTags.forEach(tag => {
        const text = tag.textContent;
        
        // デバッグ：全てのstrongタグの内容をログ出力
        console.log('Checking strong tag:', text);
        
        // 『』または「」を含むテキストに効果を適用
        // （例：『ニゲテ』、『ユルサナイ』、『仮払金』、硝子の箱など）
        const hasQuotes = text.includes('『') || text.includes('』');
        // 特定のキーワード（「硝子」「箱」など不気味な単語）も対象
        const hasSpookyWord = /硝子|箱|沈む|溶ける|壊れる|消える/.test(text);
        
        if (hasQuotes || hasSpookyWord) {
            tag.classList.add('horror-text');
            console.log('✓ Horror text detected and class added:', text);
        }
    });
}

// backgroundKeywordsをグローバルに公開（設定画面から使用するため）
window.backgroundKeywords = backgroundKeywords;

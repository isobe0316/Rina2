// index.html用のJavaScript

function startStory() {
    // OPテーマを即座に停止してからストーリーへ
    if (typeof audioManager !== 'undefined') {
        audioManager.stop(false);
    }
    window.location.href = 'reader.html?file=story_ch1.md';
}

function showIndex() {
    document.getElementById('index-view').classList.remove('hidden');
}

function hideIndex() {
    document.getElementById('index-view').classList.add('hidden');
}

function showAbout() {
    document.getElementById('about-view').classList.remove('hidden');
}

function hideAbout() {
    document.getElementById('about-view').classList.add('hidden');
}

// 設定画面の表示/非表示
function showSettings() {
    document.getElementById('settings-view').classList.remove('hidden');
    initSettingsPage();
}

function hideSettings() {
    document.getElementById('settings-view').classList.add('hidden');
}

// 設定ページの初期化
function initSettingsPage() {
    const select = document.getElementById('image-select');
    select.innerHTML = '<option value="">-- 画像を選択 --</option>';
    
    // reader.jsから背景画像キーワードを取得（グローバルに公開する必要がある）
    if (typeof backgroundKeywords !== 'undefined') {
        const imageNames = Object.keys(backgroundKeywords);
        imageNames.forEach(imagePath => {
            const option = document.createElement('option');
            option.value = imagePath;
            option.textContent = imagePath.replace('images/', '');
            select.appendChild(option);
        });
    }
}

// 画像を選択したときにキーワードを読み込む
function loadKeywordsForImage() {
    const select = document.getElementById('image-select');
    const imagePath = select.value;
    const keywordList = document.getElementById('keyword-list');
    const input = document.getElementById('keywords-input');
    
    if (!imagePath) {
        keywordList.style.display = 'none';
        return;
    }
    
    keywordList.style.display = 'block';
    
    // ローカルストレージから保存されたキーワードを読み込む
    const savedKeywords = localStorage.getItem('bgKeywords_' + imagePath);
    
    if (savedKeywords) {
        input.value = savedKeywords;
    } else if (typeof backgroundKeywords !== 'undefined' && backgroundKeywords[imagePath]) {
        // デフォルトのキーワードを表示
        input.value = backgroundKeywords[imagePath].join(', ');
    } else {
        input.value = '';
    }
}

// キーワードを保存
function saveKeywords() {
    const select = document.getElementById('image-select');
    const input = document.getElementById('keywords-input');
    const imagePath = select.value;
    
    if (!imagePath) return;
    
    const keywords = input.value.trim();
    localStorage.setItem('bgKeywords_' + imagePath, keywords);
    
    alert('保存しました！\n変更を反映するにはページをリロードしてください。');
}

// キーワードを初期値に戻す
function resetKeywords() {
    const select = document.getElementById('image-select');
    const input = document.getElementById('keywords-input');
    const imagePath = select.value;
    
    if (!imagePath) return;
    
    localStorage.removeItem('bgKeywords_' + imagePath);
    
    if (typeof backgroundKeywords !== 'undefined' && backgroundKeywords[imagePath]) {
        input.value = backgroundKeywords[imagePath].join(', ');
    } else {
        input.value = '';
    }
    
    alert('初期値に戻しました！\n変更を反映するにはページをリロードしてください。');
}

// ESCキーで閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideIndex();
        hideAbout();
        hideSettings();
    }
});

// スタート画面からタイトル画面へ遷移
function showTitleScreen() {
    // 背景画像を設定（雨の窓 - 夜）
    const bgLayer = document.getElementById('bg-image');
    if (bgLayer) {
        bgLayer.style.backgroundImage = "url('images/rain_window.jpg')";
        console.log('Title screen background set');
    }
    
    const startScreen = document.getElementById('start-screen');
    const titleScreen = document.getElementById('title-screen');
    
    startScreen.classList.add('fade-out');
    
    setTimeout(() => {
        startScreen.style.display = 'none';
        titleScreen.classList.remove('hidden');
        
        // OPテーマを再生
        if (typeof audioManager !== 'undefined') {
            audioManager.play('op', { loop: true, fadeIn: true });
        }
    }, 500);
}

// reader.htmlからindex.htmlへ戻る際のBGM停止処理
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

// ページ読み込み時の処理
window.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const titleScreen = document.getElementById('title-screen');
    
    // ページ読み込み時に背景画像を設定
    const bgLayer = document.getElementById('bg-image');
    if (bgLayer) {
        bgLayer.style.backgroundImage = "url('images/rain_window.jpg')";
        console.log('Initial background set on load');
    }
    
    // URLに#titleがある場合は直接タイトル画面へ
    if (window.location.hash === '#title') {
        startScreen.style.display = 'none';
        titleScreen.classList.remove('hidden');
        
        // OPテーマを再生
        if (typeof audioManager !== 'undefined') {
            setTimeout(() => {
                audioManager.play('op', { loop: true, fadeIn: true });
            }, 300);
        }
        return;
    }
    
    // スタート画面をクリックでタイトル画面へ
    if (startScreen) {
        startScreen.addEventListener('click', showTitleScreen);
    }
});

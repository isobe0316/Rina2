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
    // OPテーマを停止
    if (typeof audioManager !== 'undefined') {
        audioManager.stop(true);
    }
}

function hideSettings() {
    document.getElementById('settings-view').classList.add('hidden');
    // 再生中の試聴トラックを停止
    stopAllTracks();
    // OPテーマを再開
    if (typeof audioManager !== 'undefined') {
        audioManager.play('op', { loop: true, fadeIn: true });
    }
}

// BGM試聴機能
const musicTracks = [
    { title: 'OPテーマ 1', file: 'audio/bgm/op_theme_1.mp3' },
    { title: 'OPテーマ 2', file: 'audio/bgm/op_theme_2.mp3' },
    { title: 'OPテーマ 3', file: 'audio/bgm/op_theme_3.mp3' },
    { title: 'ストーリーオープニング', file: 'audio/bgm/story_opening.mp3' },
    { title: '美咲の箱', file: 'audio/bgm/misaki_box_theme.mp3' },
    { title: '選択の瞬間', file: 'audio/bgm/choice_moment.mp3' },
    { title: 'TRUE ENDテーマ', file: 'audio/bgm/true_ed.mp3' },
    { title: 'BAD/DEAD ENDテーマ', file: 'audio/bgm/bad_dead_ed.mp3' }
];

let currentAudio = null;
let isPlayingAll = false;
let currentTrackIndex = 0;

// 個別トラック再生
function playTrack(index) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    const track = musicTracks[index];
    currentAudio = new Audio(track.file);
    currentTrackIndex = index;
    
    // 再生中表示を更新
    updateNowPlaying(track.title);
    
    // 再生ボタンの状態を更新
    updateTrackButtons(index);
    
    currentAudio.play();
    
    // 終了時の処理
    currentAudio.onended = function() {
        if (isPlayingAll) {
            // 全曲再生モードの場合は次の曲へ
            playNextTrack();
        } else {
            // 個別再生の場合は停止
            hideNowPlaying();
            resetTrackButtons();
        }
    };
}

// 次のトラックを再生
function playNextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex < musicTracks.length) {
        playTrack(currentTrackIndex);
    } else {
        // 全曲終了
        stopAllTracks();
    }
}

// 全曲再生
function playAllTracks() {
    isPlayingAll = true;
    currentTrackIndex = 0;
    document.getElementById('play-all-btn').style.display = 'none';
    document.getElementById('stop-all-btn').style.display = 'inline-block';
    playTrack(0);
}

// 再生停止
function stopAllTracks() {
    isPlayingAll = false;
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    document.getElementById('play-all-btn').style.display = 'inline-block';
    document.getElementById('stop-all-btn').style.display = 'none';
    hideNowPlaying();
    resetTrackButtons();
}

// 再生中表示を更新
function updateNowPlaying(title) {
    const nowPlaying = document.getElementById('now-playing');
    const nowPlayingTitle = document.getElementById('now-playing-title');
    nowPlayingTitle.textContent = title;
    nowPlaying.style.display = 'block';
}

// 再生中表示を非表示
function hideNowPlaying() {
    document.getElementById('now-playing').style.display = 'none';
}

// トラックボタンの状態を更新
function updateTrackButtons(playingIndex) {
    const buttons = document.querySelectorAll('.track-play-btn');
    buttons.forEach((btn, index) => {
        if (index === playingIndex) {
            btn.textContent = '■';
            btn.classList.add('playing');
        } else {
            btn.textContent = '▶';
            btn.classList.remove('playing');
        }
    });
}

// トラックボタンをリセット
function resetTrackButtons() {
    const buttons = document.querySelectorAll('.track-play-btn');
    buttons.forEach(btn => {
        btn.textContent = '▶';
        btn.classList.remove('playing');
    });
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

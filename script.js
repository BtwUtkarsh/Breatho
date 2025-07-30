console.log("Welcome to Breatho");

let songIndex = 0;
let audioElement = new Audio('Songs/I Guess.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "I Guess", filePath: "Songs/I Guess.mp3", coverPath: "images/I-Guess.jpg" },
    { songName: "Ankhiyon Ke Jharokhon Se", filePath: "Songs/Ankhiyon Ke Jharokhon Se 320 Kbps.mp3", coverPath: "images/Jharokhe.jpg" },
    { songName: "Talk My Shit Guarantee", filePath: "Songs/Talk My Shit Guarantee Yours Truly 320 Kbps.mp3", coverPath: "images/Talkmyshit.jpg" },
    { songName: "Signed To God", filePath: "Songs/Signed To God Sidhu Moose Wala 320 Kbps.mp3", coverPath: "images/signed.jpg" },
    { songName: "Brothers Anthem", filePath: "Songs/Brothers Anthem Vishal Dadlani 320 Kbps.mp3", coverPath: "images/brothers.jpg" },
    { songName: "Selfmade Chaache Maame", filePath: "Songs/Selfmade_Chaache_Maame.mp3", coverPath: "images/selfmade.jpg" },
    { songName: "No Cap", filePath: "Songs/No_Cap_Krsna.mp3", coverPath: "images/No-Cap.jpg" },
    { songName: "52 Bars", filePath: "Songs/52 Bars.mp3", coverPath: "images/52bars.jpeg" },
    { songName: "Khaab", filePath: "Songs/Khaab Akhil 320 kbps.mp3", coverPath: "images/Khaab.jpg" },
];

// Update song list UI
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Play/pause master button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
    if (!isNaN(audioElement.duration)) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});

// Seek functionality
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all small play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    });
};

// Click on individual song
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = index;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
// Enable full songItem click (not just icon)
document.querySelectorAll('.songItem').forEach((item, index) => {
    item.addEventListener('click', () => {
        makeAllPlays();
        document.getElementById(index).classList.remove('fa-play-circle');
        document.getElementById(index).classList.add('fa-pause-circle');
        songIndex = index;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});


let musicas = [
    {
        title: 'Lose Control',
        artist: 'Teddy Swims',
        src: './musicas/LoseControl - Teddy Swims.mp3',
        img: './imagens/Ted.jpeg'
    },
    {
        title: 'Como é que a gente fica',
        artist: 'H&J',
        src: './musicas/Como é Que a Gente Fica - Henrique e Juliano.mp3',
        img: './imagens/Herinque&juliano.jpg'
    },
    {
        title: 'Tenho que de me decidir',
        artist: 'PH',
        src: './musicas/Tenho Que Me Decidir - MC PH.mp3',
        img: './imagens/PH.jpg'
    }
];

let music = document.getElementById('audio');
let indexMusic = 0
let durationMusic = document.getElementById('endt');
let imagem = document.querySelector('img')
let musicName = document.getElementById('name')
let singerName = document.getElementById('descriptonI');
let volumeControl = document.getElementById('volume');



music.addEventListener('loadedmetadata', () => {
    durationMusic.textContent = secondsForMinutes(Math.floor(music.duration));
});

music.volume = volumeControl.value;


volumeControl.addEventListener('input', (event) => {
    music.volume = event.target.value;
});


document.getElementById('play-button').addEventListener('click', playMusic);
document.getElementById('pause-button').addEventListener('click', pauseMusic);
music.addEventListener('timeupdate', updateBar);

document.getElementById('prev-arrow').addEventListener('click', () => {
    indexMusic--;
    if (indexMusic < 0) {
        indexMusic = 2;
    }
    renderMusic(indexMusic);
});
document.getElementById('next-arrow').addEventListener('click', () => {
    indexMusic++;
    if (indexMusic > 2) {
        indexMusic = 0;
    }
    renderMusic(indexMusic);
});

function renderMusic(index) {
    music.setAttribute('src', musicas[index].src);
    music.addEventListener('loadeddata', () => {
        musicName.textContent = musicas[index].title;
        singerName.textContent = musicas[index].artist;
        imagem.src = musicas[index].img;
        music.addEventListener('loadedmetadata', () => {
            durationMusic.textContent = secondsForMinutes(Math.floor(music.duration));
        });

    });
}
function playMusic() {
    music.play();
    document.getElementById('pause-button').style.display = 'block';
    document.getElementById('play-button').style.display = 'none';
}

function pauseMusic() {
    music.pause();
    document.getElementById('pause-button').style.display = 'none';
    document.getElementById('play-button').style.display = 'block';
}

function updateBar() {
    let jsBar = document.getElementById('progress');
    jsBar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';
    let timeElapsed = document.getElementById('start')
    timeElapsed.textContent = secondsForMinutes(Math.floor(music.currentTime))
}

function secondsForMinutes(seconds) {
    let fieldMinutes = Math.floor(seconds / 60);
    let fieldSeconds = seconds % 60;
    if (fieldSeconds < 10) {
        fieldSeconds = '0' + fieldSeconds
    }
    return fieldMinutes + ":" + fieldSeconds
}

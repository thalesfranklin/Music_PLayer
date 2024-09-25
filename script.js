let musics = [
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

let music = document.querySelector('audio');
let indexMusic = 0
let durationMusic = document.querySelector('.end');
let image = document.querySelector('img');
let musicName = document.querySelector('.description h2');
let singerName = document.querySelector('.description i');


renderMusic(indexMusic);


music.addEventListener('loadedmetadata', () => {
    durationMusic.textContent = secondsForMinutes(Math.floor(music.duration));
});


document.querySelector('.play-button').addEventListener('click', playMusic);
document.querySelector('.pause-button').addEventListener('click', pauseMusic);
music.addEventListener('timeupdate', updateBar);

document.querySelector('.prev-arrow').addEventListener('click', () => {
    indexMusic--;
    if(indexMusic < 0 ){
        indexMusic = 2;
    }
    renderMusic(indexMusic);
});
document.querySelector('.next-arrow').addEventListener('click', () => {
    indexMusic ++ ;
    if(indexMusic > 2 ){
        indexMusic = 0;
    }
    renderMusic(indexMusic);
});

function renderMusic(index) {
    music.setAttribute('src', musics[index].src);
    music.addEventListener('loadeddata', () => {
        musicName.textContent = musics[index].title;
        singerName.textContent = musics[index].artist;
        image.src = musics[index].img;
        music.addEventListener('loadedmetadata', () => {
            durationMusic.textContent = secondsForMinutes(Math.floor(music.duration));
        });

    });
}
function playMusic() {
    music.play();
    document.querySelector('.pause-button').style.display = 'block';
    document.querySelector('.play-button').style.display = 'none';
}

function pauseMusic() {
    music.pause();
    document.querySelector('.pause-button').style.display = 'none';
    document.querySelector('.play-button').style.display = 'block';
}

function updateBar() {
    let jsBar = document.querySelector('progress');
    jsBar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';
    let timeElapsed = document.querySelector('.start')
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


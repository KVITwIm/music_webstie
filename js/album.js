let container = document.querySelector(`.album`);
let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);
let playlist = document.querySelector(`.playlist`);
let album = albums[i];
let audio = document.querySelector(`.audio`);
let main = document.getElementsByTagName(`main`)

if(!album){
    container.innerHTML = "Редирект на главную страницу через 3 секунды";
    setTimeout(() => {
        window.location.pathname = "index.html";
    }, 3000)
} else {
    container.innerHTML = `
    <div class="card mb-3">
        <div class="row">
            <div class="col-4">
                <img src="${album.img}.jpg" alt="" class="img-fluid rounded-start">
            </div>
            <div class="col-8">
                <div class="card-body">
                <h5 class="card-title">${album.title}</h5>
                <p class="card-text">${album.description}</p>
                <p class="card-text"><small class="text-muted">${albums[0].year}</small></p>
                </div>
            </div>
        </div>
    </div>
`
}

for(i = 0; i < album.tracks.length; i++){
    playlist.innerHTML += `
    <li class="list-group-item d-flex align-items-center track">
        <img src="assets/free-icon-play-button-153752.png" height="30px" class="iconPause me-3">
        <img src="assets/sound-waves.png" height="30px" class="iconPlay me-3 d-none">
        <div>
            <div>${album.tracks[i].title}</div>
            <div>${album.tracks[i].author}</div>
        </div>
        <div class="time ms-auto">${album.tracks[i].time}</div>
        <audio class="audio" src="${album.tracks[i].src}"></audio>
    </li>`
}

function setupAudio() {
    let trackNodes = document.querySelectorAll(`.track`); 
    for (let i = 0; i < trackNodes.length; i++) { 
        let track = album.tracks[i];
        let node = trackNodes[i];   
        let audio = node.querySelector(`.audio`); 
        let iconPause = node.querySelector(`.iconPause`);
        let iconPlay = node.querySelector(`.iconPlay`);
        let timeNode = node.querySelector(`.time`);

            trackNodes[i].addEventListener(`click`, function () {
            if (track.isPlaying) {
                track.isPlaying = false;
                iconPlay.classList.add(`d-none`);
                iconPause.classList.remove(`d-none`);
                audio.pause();

            } else {
                track.isPlaying = true;
                iconPlay.classList.remove(`d-none`);
                iconPause.classList.add(`d-none`);
                audio.play();
                updateProgress()
            }
        });

        function updateProgress() {
            time = audio.currentTime.toFixed(2);
            timeNode.innerHTML = time;

            if(album.tracks[i].title == "Skechers"){
                container.style.transform = `rotate(${Math.round(time)}deg)`
                playlist.style.transform = `rotate(${Math.round(time)}deg)`
            }
          
            if (track.isPlaying) {
                  requestAnimationFrame(updateProgress);
            }
        }
    }
}
setupAudio();
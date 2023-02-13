let container = document.querySelector(`.album`);

for(let i = 0; i < albums.length; i++){
    let album = albums[i];
    container.innerHTML += `
        <div class="col">
              <a href="album.html?i=${i}">
                <div class="card">
                    <img src="${album.img}.jpg" alt="" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">${album.title}</p>
                    </div>
                </div>
            </a>
        </div>`;
}
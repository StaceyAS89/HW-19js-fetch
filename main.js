let urlAlbums = 'https://jsonplaceholder.typicode.com/albums';
let urlAlbumsPhotos = 'https://jsonplaceholder.typicode.com/photos?albumId='
let albumsList = document.getElementById('albums_list')
let albumsPhotoList = document.getElementById('albums_photos_list')





async function getAlbums() {
    try {
        let response = await fetch(urlAlbums);
        return response.json();
    } catch (err) {
        console.log(err)

    }
}

async function getAlbumsPhotos(id) {
    try {
        let response = await fetch(`${urlAlbumsPhotos + id}`)
        return response.json();
    } catch (err) {
        console.log(err)
    }

}

async function renderAlbums() {
    let albums = '';

    try {
        let result = await getAlbums();
        for (let item of result) {
            if (!item) {
                return;
            } else {
                albums += `<li class="album-titles" id="${item.id}">${item.title}</li>`
            }
            albumsList.innerHTML = albums;
        }
    } catch (err) {
        console.log("Ошибка HTTP: " + err);
    }
}
renderAlbums();

async function renderAlbumsPhotos(id) {
    let albumsPhotos = '';
    try {
        let result = await getAlbumsPhotos(id);
        for (let item of result) {
            if (!item) {
                return;
            } else {
                albumsPhotos += `<img class="album-photos-titles" src="${item.url}" id="${item.id}">${item.url}>`
            }
            albumsPhotoList.innerHTML = albumsPhotos;
        }
    } catch (err) {
        console.log("Ошибка HTTP: " + err);
    }
}
renderAlbumsPhotos("1");

albumsList.addEventListener('click', (event) => {
    renderAlbumsPhotos(event.target.id)
})
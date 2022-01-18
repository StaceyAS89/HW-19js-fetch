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



async function showAlbums() {
    try {
        let result = await getAlbums();
        renderAlbums(result)
    } catch (err) {
        console.log("Ошибка HTTP: " + err);
    }
}

function renderAlbums(albums) {
    let listAlbumsTemplate = '';

    for (let item of albums) {
        if (!item) {
            return;
        } else {
            listAlbumsTemplate += `<li class="album-titles" id="${item.id}">${item.title}</li>`
        }
        albumsList.innerHTML = listAlbumsTemplate;
    }
}
showAlbums();

async function getAlbumsPhotos(id) {
    try {
        let response = await fetch(`${urlAlbumsPhotos + id}`)
        return response.json();
    } catch (err) {
        console.log(err)
    }

}
async function showAlbumsPhotos(id) {
    try {
        let result = await getAlbumsPhotos(id);
        renderAlbumsPhotos(result)
    } catch (err) {
        console.log("Ошибка HTTP: " + err);
    }
}

function renderAlbumsPhotos(result) {
    let albumsPhotosTemplate = '';
    for (let item of result) {
        if (!item) {
            return;
        } else {
            albumsPhotosTemplate += `<img class="album-photos-titles" src="${item.url}" id="${item.id}">`
        }
        albumsPhotoList.innerHTML = albumsPhotosTemplate;
    }
}


showAlbumsPhotos("1");

albumsList.addEventListener('click', (event) => {
    showAlbumsPhotos(event.target.id)
})
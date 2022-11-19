const $content = document.querySelector('.mainContent');
const $artistSearch = document.querySelector('.executor_list_container_search');
const $trackSearch = document.querySelector('.mainContent__list_track_seacrh');

/**
 * Добавить заголовок
 * @param {*} text - текст для поиска
 */
function addTitle(text){
    const template = `<h1 class="title_main"> Search results for “${text}”</h1>`;
    $content.insertAdjacentHTML('afterbegin', template);
}

/**
 * Добавляет карточку исполнителя в список исполнителей
 * @param {*} image - ссылка на изображение
 * @param {*} text - имя исполнителя
 */
function addArtist(image, name){
    const template = `<div class="executor_container_search">
    <img class="img-ex-main" src="${image}"/>
    <div class="text-ex">${name}</div>
  </div>`;
    $artistSearch.insertAdjacentHTML('beforeend', template);
}

/**
 * Добавляет карточку трека в список треков
 * @param {*} image - ссылка на изображение трека
 * @param {*} text - наименование трека
 */
function addTrack(image, name){
    const template = `<div class="track_search">
    <img class="img-track" src="${image}"/>
    <div>${name}</div>
  </div>`;
    $trackSearch.insertAdjacentHTML('beforeend', template);
}

/**
 * Поиск исполнителей
 * @param {*} text - текст для поиска
 * @returns результат поиска исполнителей
 */
async function fetchArtistSearch(text) {
    try{

        const artist= await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${text}&api_key=c83120fcb17ede8c5543ddca96539813&format=json`);
        if (artist.status===200){
            const data = await artist.json();
            return data;}
        else{
            throw new Error('List of artists was not received. ' + artist.status);
        }
    }
    catch(err){
        console.error(err);
    }
}

/**
 * @returns результат поиска трека
 * @param {*} text - текст для поиска
 */
async function fetchTrackSearch(text) {
    try{

        const track= await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${text}&api_key=c83120fcb17ede8c5543ddca96539813&format=json`);
        if (track.status===200){
        const data = await track.json();
        return data;
        }
        else{
            throw new Error('List of tracks was not received. ' + track.status);
        }
    }
    catch(err){
        console.error(err);
    }
}

/**
 * вывод контента
 */
async function main(){
    let params = document.location.search;
    let text = params.split("=")[1];
    addTitle(text);
    const artistsSearch = await fetchArtistSearch(text);
    for(let i=0;i<artistsSearch["results"]["artistmatches"]["artist"].length; i++){
       addArtist(artistsSearch["results"]["artistmatches"]["artist"][i]["image"][0]["#text"], artistsSearch["results"]["artistmatches"]["artist"][i]["name"]);
    }
    const trackSearch = await fetchTrackSearch(text);
    for(let i=0;i<trackSearch["results"]["trackmatches"]["track"].length; i++){
       addTrack(trackSearch["results"]["trackmatches"]["track"][i]["image"][0]["#text"], trackSearch["results"]["trackmatches"]["track"][i]["name"]);
    }
}

main()
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
 * @param {*} url ссылка
 */
function addArtist(image, name, url){
    const template = `<div class="executor_container_search">
    <img class="img-ex-main" src="${image}"/>
    <a href=${url} target="_blank">
    <div class="text-ex">${name}</div>
    </a>
  </div>`;
    $artistSearch.insertAdjacentHTML('beforeend', template);
}

/**
 * Добавляет карточку трека в список треков
 * @param {*} image - ссылка на изображение трека
 * @param {*} text - наименование трека
 * @param {*} url ссылка
 */
function addTrack(image, name, url){
    const template = `<div class="track_search">
    <img class="img-track" src="${image}"/>
    <a href=${url} target="_blank">
    <div>${name}</div>
    </a>
  </div>`;
    $trackSearch.insertAdjacentHTML('beforeend', template);
}

/**
 * Вывести надпись, что результатов нет
 * @param {*} selector элемент, куда вставить информацию
 */
function addNoResult(selector){
    const template = `<div> Результатов не найдено </div>`;
    selector.insertAdjacentHTML('afterbegin', template);
}

/**
 * запрос данных через API Last.fm
 * @param {*} url запрос API
 * @param {*} message сообщение об ошибке
 * @returns 
 */
 async function fetchAPI(url, message) {
    try{
        const info = await fetch(url);
        if (info.status===200){
        const data = await info.json();
        return data;}
        else{
            throw new Error(message + artist.status);
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
    while(text.includes("+")){
        text = text.replace("+", ' ');
    }
    text = text.replace("%2B", "+");
    addTitle(text);
    const artists = await fetchAPI('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=c83120fcb17ede8c5543ddca96539813&format=json', 'List of artists was not received. ');
    for(let i=0;i<artists["artists"]["artist"].length; i++){
        if (artists["artists"]["artist"][i]["name"].toLowerCase().includes(text.toLowerCase())){
            addArtist(artists["artists"]["artist"][i]["image"][0]["#text"], artists["artists"]["artist"][i]["name"], artists["artists"]["artist"][i]["url"]);
        }
    }
    const tracks = await fetchAPI('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=c83120fcb17ede8c5543ddca96539813&format=json', 'List of tracks was not received. ');
    for(let i=0;i<tracks["tracks"]["track"].length; i++){
        if (tracks["tracks"]["track"][i]["name"].toLowerCase().includes(text.toLowerCase())){
            addTrack(tracks["tracks"]["track"][i]["image"][0]["#text"], tracks["tracks"]["track"][i]["name"], tracks["tracks"]["track"][i]["url"]);
        }
    }
    if (document.querySelectorAll('.executor_container_search')["length"]==0){
        addNoResult($artistSearch);
    }
    if (document.querySelectorAll('.track_search')["length"]==0){
        addNoResult($trackSearch);
    }
}

main()
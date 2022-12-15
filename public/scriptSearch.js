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
    <a href=${url} target="_blank" class="main__link link">
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
    <a href=${url} target="_blank" class="main__link link">
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
    
    const artistsSearch = await fetchAPI(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${text}&api_key=c83120fcb17ede8c5543ddca96539813&format=json`, 'List of artists was not received. ');
    const trackSearch = await fetchAPI(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${text}&api_key=c83120fcb17ede8c5543ddca96539813&format=json`, 'List of tracks was not received. ');
    while(text.includes("+")){
        text = text.replace("+", ' ');
    }
    text = text.replace("%2B", "+");
    addTitle(text);
    for(let i=0;i<artistsSearch["results"]["artistmatches"]["artist"].length; i++){
        let url = artistsSearch["results"]["artistmatches"]["artist"][i]["image"][1]["#text"];
        if (url === ''){
            url = "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";
        }
        let name = artistsSearch["results"]["artistmatches"]["artist"][i]["name"];
        console.log(name);
        if (name.length>=30){
            name = name.slice(0, 30) + '...';
        }
        console.log(name);
        console.log(name.length);
       addArtist(url, name, artistsSearch["results"]["artistmatches"]["artist"][i]["url"]);
    }
    for(let i=0;i<trackSearch["results"]["trackmatches"]["track"].length; i++){
        addTrack(trackSearch["results"]["trackmatches"]["track"][i]["image"][0]["#text"], trackSearch["results"]["trackmatches"]["track"][i]["name"],  trackSearch["results"]["trackmatches"]["track"][i]["url"]);
    }
    if (document.querySelectorAll('.executor_container_search')["length"]==0){
        addNoResult($artistSearch);
    }
    if (document.querySelectorAll('.track_search')["length"]==0){
        addNoResult($trackSearch);
    }
}

main()
//export{}
const $trackList = document.querySelector('.mainContent__list_track');
const $topArtistList = document.querySelector('.main_executor_list_container');
const $artistList = document.querySelector('.executor_list_container');

/**
 * Добавляет карточку трека в список треков
 * @param {*} image - ссылка на изображение трека
 * @param {*} text - наименование трека
 * @param {*} url ссылка
 */
function addTrackUI(image, text, url){
  const template = `<div class="track"><img class="img-track" src="${image}"/><a href=${url} target="_blank"><div>${text}</div></a></div>`;
  $trackList.insertAdjacentHTML('beforeend', template);
}

/**
 * добавляет большую карточку исполнителя в список исполнителей
 * @param image ссылка на изображение карточки исполнителя
 * @param text имя исполнителя
 * @param {*} url ссылка
 */
function addTopArtistUI(image, text, url){
    const template = `<div class="executor_container_main">
      <img class="img-ex-main" src="${image}"/>
      <a href=${url} target="_blank">
      <div class="text-ex">${text}</div>
      </a>
    </div>`;
    $topArtistList.insertAdjacentHTML('beforeend', template);
}

/**
 * добавляет карточку исполнителя в список исполнителей
 * @param image ссылка на изображение карточки исполнителя
 * @param text имя исполнителя
 */
function addArtistUI(image, text, url){
    const template = `<div class="executor_container">
    <img class="img-ex" src="${image}"/>
    <a href=${url} target="_blank">
    <div class="text-ex">${text}</div>
    </a>
  </div>`;
    $artistList.insertAdjacentHTML('beforeend', template);
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
async function main() {
    const tracks = await fetchAPI('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=c83120fcb17ede8c5543ddca96539813&format=json', 'List of tracks was not received. ');
    for(let i=0;i<tracks["tracks"]["track"].length; i++){
        addTrackUI(tracks["tracks"]["track"][i]["image"][0]["#text"], tracks["tracks"]["track"][i]["name"], tracks["tracks"]["track"][i]["url"]);
    }

    const artists = await fetchAPI('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=c83120fcb17ede8c5543ddca96539813&format=json', 'List of artists was not received. ');
    for(let i=0;i<artists["artists"]["artist"].length; i++){
        if (i==0 || i==1){
            addTopArtistUI(artists["artists"]["artist"][i]["image"][0]["#text"], artists["artists"]["artist"][i]["name"], artists["artists"]["artist"][i]["url"]);
        }
        else{
            addArtistUI(artists["artists"]["artist"][i]["image"][0]["#text"], artists["artists"]["artist"][i]["name"], artists["artists"]["artist"][i]["url"]);
        }
        
    }
}

main();
//export{}
const $trackList = document.querySelector('.mainContent__list_track');
const $topArtistList = document.querySelector('.main_executor_list_container');
const $artistList = document.querySelector('.executor_list_container');

/**
 * Добавляет карточку трека в список треков
 * @param {*} image - ссылка на изображение трека
 * @param {*} text - наименование трека
 */
function addTrackUI(image, text){
  const template = `<div class="track"><img class="img-track" src="${image}"/><div>${text}</div></div>`;
  $trackList.insertAdjacentHTML('beforeend', template);
}

/**
 * добавляет большую карточку исполнителя в список исполнителей
 * @param image ссылка на изображение карточки исполнителя
 * @param text имя исполнителя
 */
function addTopArtistUI(image, text){
    const template = `<div class="executor_container_main">
      <img class="img-ex-main" src="${image}"/>
      <div class="text-ex">${text}</div>
    </div>`;
    $topArtistList.insertAdjacentHTML('beforeend', template);
}

/**
 * добавляет карточку исполнителя в список исполнителей
 * @param image ссылка на изображение карточки исполнителя
 * @param text имя исполнителя
 */
function addArtistUI(image, text){
    const template = `<div class="executor_container">
    <img class="img-ex" src="${image}"/>
    <div class="text-ex">${text}</div>
  </div>`;
    $artistList.insertAdjacentHTML('beforeend', template);
}

/**
 * 
 * @returns чарт лучших треков
 */
async function fetchTracks() {
    try{
        const track= await fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=c83120fcb17ede8c5543ddca96539813&format=json');
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
 * @returns чарт лучших исполнителей
 */
async function fetchArtist() {
    try{

        const artist= await fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=c83120fcb17ede8c5543ddca96539813&format=json');
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
 * вывод контента
 */
async function main() {
    const tracks = await fetchTracks();
    console.log(tracks);
    for(let i=0;i<Math.min(15, tracks["tracks"]["track"].length); i++){
        addTrackUI(tracks["tracks"]["track"][i]["image"][0]["#text"], tracks["tracks"]["track"][i]["name"]);
    }

    const artists = await fetchArtist();
    for(let i=0;i<Math.min(14, artists["artists"]["artist"].length); i++){
        if (i==0 || i==1){
            addTopArtistUI(artists["artists"]["artist"][i]["image"][0]["#text"], artists["artists"]["artist"][i]["name"]);
        }
        else{
            addArtistUI(artists["artists"]["artist"][i]["image"][0]["#text"], artists["artists"]["artist"][i]["name"]);
        }
        
    }
}

main();
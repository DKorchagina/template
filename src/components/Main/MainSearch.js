import { useEffect, useState } from "react";
/**
 * Вывод Main для страницы поиска
 */
export const MainSearch = () => {
    let params = document.location.search;
    let text = params.split("=")[1];
    
    const [tracks, setTracks] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [error, setError] = useState(null);
    useEffect(()=>{
        fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${text}&api_key=c83120fcb17ede8c5543ddca96539813&format=json&limit=15`).then(res => res.json()).then((result) => {
            setIsLoader(true);
            setTracks(result.results.trackmatches.track);
        }, (error)=>{
            setIsLoader(false);
            setError(error);
        })
    }, []);
    let template;
    if (error){
        template = <div>Error: {error.message}</div>;
    }
    else if (!isLoader){
        template =  <div>Loading...</div>;
    }
    else if (tracks.length==0){
        template = <div> No results </div>;
    }
    else {
        template = 
        <div className="mainContent__list_track_seacrh">
            {tracks.map((item)=>(
                <div className="track_search" key={tracks.indexOf(item)}>
                <img className="img-track" src={item.image[1]["#text"]} alt=""/>
                <a href={item.url} target="_blank" rel="noreferrer" className="main__link link">
                <div>{item.name}</div>
                </a>
              </div>
            ))}
        </div>
        ;
    }

    const [artists, setArtists] = useState([]);
    const [isLoaderArtist, setIsLoaderArtist] = useState(false);
    const [errorArtist, setErrorArtist] = useState(null);
    useEffect(()=>{
        fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${text}&api_key=c83120fcb17ede8c5543ddca96539813&format=json&limit=28`).then(res => res.json()).then((result) => {
            setIsLoaderArtist(true);
            setArtists(result.results.artistmatches.artist);
        }, (error)=>{
            setIsLoaderArtist(false);
            setErrorArtist(error);
        })
    }, []);

    artists.map((item)=>{
        if (item.image[1]["#text"] == ''){
            item.image[1]["#text"] = "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";
        }
        let name = item.name;
        if (name.length>=30){
            name = name.slice(0, 30) + '...';
        }
        item.name = name;
    });

    let templateArtist;
    if (errorArtist){
        templateArtist = <div>Error: {errorArtist.message}</div>;
    }
    else if (!isLoaderArtist){
        templateArtist =  <div>Loading...</div>;
    }
    else if (artists.length==0){
        templateArtist = <div> No results</div>;
    }
    else{
        templateArtist = <div className="executor_list_container_search">
            {artists.map((item)=>(
                <div className="executor_container_search" key={artists.indexOf(item)}>
                <img className="img-ex-main" src={item.image[1]["#text"]} alt=""/>
                <a href={item.url} target="_blank" rel="noreferrer" className="main__link link">
            <div className="text-ex">{item.name}</div>
                </a>
              </div>
            ))}
        </div>
        ;
    }

    while(text.includes("+")){
        text = text.replace("+", ' ');
    }
    text = text.replace("%2B", "+");
    const title = <h1 className="title_main"> Search results for “{text}”</h1>;
    
    return (
        <main className="content">
            <div className="mainContent">
                {title}
                <h3 className="title_three"> Artists</h3>
                <div className="mainContent__list_executor">
                    {templateArtist}
                </div>

                <h3 className="title_three">Tracks</h3>
                {template}
            </div>
        </main>
    );
}
import { useEffect, useState } from "react";

/**
 * Вывод Main для главной страницы
 */
export const Main = () => {
    const [tracks, setTracks] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [error, setError] = useState(null);
    //получение списка треков
    useEffect(()=>{
        fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=c83120fcb17ede8c5543ddca96539813&limit=15&format=json').then(res => res.json()).then((result) => {
            setIsLoader(true);
            setTracks(result.tracks.track);
        }, (error)=>{
            setIsLoader(false);
            setError(error);
        })
    }, []);
    tracks.map((item)=>{
        let name = item.name;
        if (name.length>=30){
            name = name.slice(0, 30) + '...';
        }
        item.name = name;
    });
    let template;
    if (error){
        template = <div>Error: {error.message}</div>;
    }
    else if (!isLoader){
        template =  <div>Loading...</div>;
    }
    else{
        template = 
            <div className="mainContent__list_track">
                {tracks.map((item)=>(
                    <div className="track" key={tracks.indexOf(item)}><img className="img-track" src={item.image[1]["#text"]} alt=""/><a href={item.url} target="_blank" rel="noreferrer" className="main__link link"><div>{item.name}</div></a></div>
                ))}
            </div>
        ;
    }

    //получение списка артистов
    const [artists, setArtists] = useState([]);
    const [artistTop, setArtistsTop] = useState([]);
    const [isLoaderArtist, setIsLoaderArtist] = useState(false);
    const [errorArtist, setErrorArtist] = useState(null);
    useEffect(()=>{
        fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=c83120fcb17ede8c5543ddca96539813&limit=14&format=json').then(res => res.json()).then((result) => {
            setIsLoaderArtist(true);
            setArtists(result.artists.artist.slice(2));
            setArtistsTop(result.artists.artist.slice(0, 2));
        }, (error)=>{
            setIsLoaderArtist(false);
            setErrorArtist(error);
        })
    }, []);
    artistTop.map((item)=>{
        let name = item.name;
        if (name.length>=20){
            name = name.slice(0, 20) + '...';
        }
        item.name = name;
    });
    let templateArtistTop;
    if (errorArtist){
        templateArtistTop = <div>Error: {errorArtist.message}</div>;
    }
    else if (!isLoaderArtist){
        templateArtistTop =  <div>Loading...</div>;
    }
    else{
        templateArtistTop = 
        <div className="main_executor_list_container">
            {artistTop.map((item)=>(
                <div className="executor_container_main" key={artistTop.indexOf(item)}>
                    <div><img className="img-ex-main" src={item.image[3]["#text"]} alt=""/></div>
                    <a href={item.url} target="_blank" rel="noreferrer" className="main__link link">
                        <div>{item.name}</div>
                    </a>
                </div>
            ))}
        </div>
        ;
    }
    artists.map((item)=>{
        let name = item.name;
        if (name.length>=15){
            name = name.slice(0, 15) + '...';
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
    else{
        templateArtist = 
            <div className="executor_list_container">
                {artists.map((item)=>(
                    <div className="executor_container" key={artists.indexOf(item)}>
                        <div><img className="img-ex" src={item.image[2]["#text"]} alt=""/></div>
                        <a href={item.url} target="_blank" rel="noreferrer" className="main__link link">
                            <div>{item.name}</div>
                        </a>
                    </div>
    ))}
            </div>
        ;
    }

    return (
        <main className="content">
        <div className="mainContent">
            <h1 className="title_main">Music</h1>
            <h2 className="title_second">Hot right now</h2>
            <div className="mainContent__list_executor">
                {templateArtistTop}
              {templateArtist}
            </div>
            <h2 className="title_second">Popular tracks</h2>
            {template}
            
        </div>
      </main>
    );
}
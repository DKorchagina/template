import { useEffect, useState } from "react";

/**
 * Вывод Main для главной страницы
 */
export const Main = () => {
    const [templateTrack, setTemplateTrack] = useState(<div>Loading...</div>);

    //получение списка треков
    useEffect(()=>{
        fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=c83120fcb17ede8c5543ddca96539813&limit=15&format=json').then(res => res.json()).then((result) => {
            result.tracks.track.map((item)=>{
                let name = item.name;
                if (name.length>=30){
                    name = name.slice(0, 30) + '...';
                }
                item.name = name;
            });
            setTemplateTrack(<div className="mainContent__list_track">
            {result.tracks.track.map((item)=>(
                <div className="track" key={result.tracks.track.indexOf(item)}><img className="img-track" src={item.image[1]["#text"]} alt=""/><a href={item.url} target="_blank" rel="noreferrer" className="main__link link"><div>{item.name}</div></a></div>
            ))}</div>);
        }, (error)=>{
            setTemplateTrack(<div>Error: {error.message}</div>);
        })
    }, []);

    //получение списка артистов
    const [templateArtistTop, setTemplateArtistTop] = useState(<div>Loading...</div>);
    const [templateArtist, setTemplateArtist] = useState(<div>Loading...</div>);

    useEffect(()=>{
        fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=c83120fcb17ede8c5543ddca96539813&limit=14&format=json').then(res => res.json()).then((result) => {
            result.artists.artist.map((item)=>{
                let name = item.name;
                if (name.length>=20){
                    name = name.slice(0, 20) + '...';
                }
                item.name = name;
            });    
            setTemplateArtistTop(<div className="main_executor_list_container">
                {result.artists.artist.slice(0, 2).map((item)=>(
                    <div className="executor_container_main" key={result.artists.artist.slice(0, 2).indexOf(item)}>
                        <div><img className="img-ex-main" src={item.image[3]["#text"]} alt=""/></div>
                        <a href={item.url} target="_blank" rel="noreferrer" className="main__link link">
                            <div>{item.name}</div>
                        </a>
                    </div>
                ))}
            </div>);
            setTemplateArtist(<div className="executor_list_container">
            {result.artists.artist.slice(2).map((item)=>(
                <div className="executor_container" key={result.artists.artist.slice(2).indexOf(item)}>
                    <div><img className="img-ex" src={item.image[2]["#text"]} alt=""/></div>
                    <a href={item.url} target="_blank" rel="noreferrer" className="main__link link">
                        <div>{item.name}</div>
                    </a>
                </div>
))}
        </div>);
        }, (error)=>{
            setTemplateArtistTop(<div>Error: {error.message}</div>);
            setTemplateArtist(<div>Error: {error.message}</div>);
        })
    }, []);

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
            <div children={templateTrack}/>
            
        </div>
      </main>
    );
}
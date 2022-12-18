import { useEffect, useState } from "react";
/**
 * Вывод Main для страницы поиска
 */
export const MainSearch = () => {
    let params = document.location.search;
    let text = params.split("=")[1];
    
    const [templateTrack, setTemplateTrack] = useState(<div>Loading...</div>);
    useEffect(()=>{
        fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${document.location.search.split("=")[1]}&api_key=c83120fcb17ede8c5543ddca96539813&format=json&limit=15`).then(res => res.json()).then((result) => {
            if (result.results.trackmatches.track.length===0){
                setTemplateTrack(<div> No results </div>);
            }
            else{
                setTemplateTrack(<div className="mainContent__list_track_seacrh">
                {result.results.trackmatches.track.map((item)=>(
                    <div className="track_search" key={result.results.trackmatches.track.indexOf(item)}>
                    <img className="img-track" src={item.image[1]["#text"]} alt=""/>
                    <a href={item.url} target="_blank" rel="noreferrer" className="main__link link">
                    <div>{item.name}</div>
                    </a>
                  </div>
                ))}
            </div>);
            }
        }, (error)=>{
            setTemplateTrack(<div>Error: {error.message}</div>)
        })
    }, []);
   
    const [templateArtist, setTemplateArtist] = useState(<div>Loading...</div>);
    useEffect(()=>{
        fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${document.location.search.split("=")[1]}&api_key=c83120fcb17ede8c5543ddca96539813&format=json&limit=28`).then(res => res.json()).then((result) => {
            result.results.artistmatches.artist.map((item)=>{
                if (item.image[1]["#text"] === ''){
                    item.image[1]["#text"] = "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";
                }
                let name = item.name;
                if (name.length>=30){
                    name = name.slice(0, 30) + '...';
                }
                item.name = name;
            });
            if (result.results.artistmatches.artist.length===0){
                setTemplateArtist(<div> No results </div>);
            }
            else{
                setTemplateArtist(<div className="executor_list_container_search">
                {result.results.artistmatches.artist.map((item)=>(
                    <div className="executor_container_search" key={result.results.artistmatches.artist.indexOf(item)}>
                    <img className="img-ex-main" src={item.image[1]["#text"]} alt=""/>
                    <a href={item.url} target="_blank" rel="noreferrer" className="main__link link">
                <div className="text-ex">{item.name}</div>
                    </a>
                  </div>
                ))}
            </div>);
            }
        }, (error)=>{
            setTemplateArtist(<div>Error: {error.message}</div>)
        })
    }, []);

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
                {templateTrack}
            </div>
        </main>
    );
}
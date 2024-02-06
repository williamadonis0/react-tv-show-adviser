import s from "./style.module.css"
import {TVShowAPI} from "./api/tv-show";
import {useEffect, useState} from "react";
import {BACKDROP_BASE_URL} from "./config";
import {TVShowDetail} from "./Components/TVShowDetail/TVShowDetail";
import {Logo} from "./Components/Logo/Logo";
import logo from "./assets/images/logo.png"
import {TVShowList} from "./Components/TVShowList/TVShowList";
import {SearchBar} from "./Components/SearchBar/SearchBar";

export function App() {
    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);

    async function fetchPopulars() {
        try {
            const populars = await TVShowAPI.fetchPopulars();
            if (populars.length > 0) {
                setCurrentTVShow(populars[0]);
            }
        } catch (error) {
            alert("Erreur durant la recherche des séries populaires")
        }
    }

    async function fetchRecommandations(tvShowId) {
        try {
            const recommendations = await TVShowAPI.fetchRecommandations(tvShowId);
            if (recommendations.length > 0) {
                setRecommendationList(recommendations.slice(0, 10));
            }
        } catch (error) {
            alert("Erreur durant la recherche des séries recommandées")
        }

    }

    async function searchTVShow(tvShowName) {
        try {
            const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
            if (searchResponse.length > 0) {
                setCurrentTVShow(searchResponse[0])
            }
        } catch (e) {
            alert("Erreur durant la recherche de la série populaire")
        }
    }

    useEffect(() => {
        fetchPopulars();
    }, []);

    useEffect(() => {
        if (currentTVShow) {
            fetchRecommandations(currentTVShow.id);
        }
    }, [currentTVShow]);

    return (
        <>
            <div
                className={s.main_container}
                style={{background: currentTVShow ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover` : "black"}}
            >
                <div className={s.header}>
                    <div className="row">
                        <div className="col-4">
                            <Logo image={logo} title="Watowatch" subtilte="Find a show you may like"/>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <SearchBar onSubmit={searchTVShow}/>
                        </div>
                    </div>

                </div>
                <div className={s.tv_show_detail}>
                    {currentTVShow && <TVShowDetail tvShow={currentTVShow}/>}
                </div>
                <div className={s.recommandations}>
                    {recommendationList && recommendationList.length > 0 && (
                        <TVShowList onClickItem={setCurrentTVShow} tvShowList={recommendationList}/>)}
                </div>
            </div>
        </>
    )
}
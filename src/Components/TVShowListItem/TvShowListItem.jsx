import s from "./stye.module.css"
import {SMALL_IMG_COVER_BASE_URL} from "../../config";

export function TvShowListItem({tvShow, onClick}) {
    return (
        <>
            <div onClick={() => onClick(tvShow)} className={s.container}>
                <img
                    className={tvShow.title}
                    alt={tvShow.name}
                    src={SMALL_IMG_COVER_BASE_URL + tvShow.backdrop_path}/>
                <div className={s.title}>{tvShow.title}</div>

            </div>
        </>
    )
}
import s from "./style.module.css"
import {TvShowListItem} from "../TVShowListItem/TvShowListItem";

export function TVShowList({tvShowList, onClickItem}) {
    return (
        <>
            <div className={s.title}>You may also like:</div>
            <div className={s.list}>
                {tvShowList.map((tvShow) => {
                    return (
                        <span key={tvShow.id} className={s.tv_show_list_item}>
                        <TvShowListItem onClick={onClickItem} tvShow={tvShow}/>
                    </span>
                    )
                })}
            </div>

        </>
    )
}
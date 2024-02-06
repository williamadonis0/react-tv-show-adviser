import s from "./style.module.css"

export function Logo({image, title, subtilte}) {
    return (
        <>
            <div className={s.container}>
                <img alt="logo" src={image} className={s.img}/>
                <span className={s.title}>{title}</span>
            </div>
            <span className={s.subtitle}>{subtilte}</span>
        </>
    )
}
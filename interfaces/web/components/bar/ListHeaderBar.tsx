import "@styles/components/headerbar.scss";

export function ListHeaderBar({ list, view, onChange, size } : { 
    list: any[],
    view: string,
    onChange: (v: string) => void,
    size? : string
}) {
    return (
        <header className="headerbar">
            <ul className="headerbar__list">
                {list && list.map(item => (
                    <li key={ item.key } className={ view === item.key ? '--active' : '' }>
                        <button onClick={ () => onChange(item.key)}>
                            {item.icon}<span style={{fontSize: size || '2vw'}}>{item.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </header>
    )
}
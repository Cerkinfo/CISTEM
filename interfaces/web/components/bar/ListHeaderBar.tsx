import "@styles/components/headerbar.scss";

export function ListHeaderBar({ list, view, onChange } : { 
    list: any[],
    view: string,
    onChange: (v: string) => void
}) {
    return (
        <header className="headerbar">
            <ul className="headerbar__list">
                {list && list.map(item => (
                    <li key={ item.key } className={ view === item.key ? '--active' : '' }>
                        <button onClick={ () => onChange(item.key)}>
                            {item.icon}<span>{item.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </header>
    )
}
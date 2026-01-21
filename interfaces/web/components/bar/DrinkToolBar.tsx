import "@styles/components/toolbar.scss"

export function DrinkToolBar({ list, view, onChange } : { 
    list: any, 
    view: string, 
    onChange: (v: string) => void 
}) {
    return (
        <div className="toolbar">
            <ul className="toolbar__list">
                {list.map((item: any) => (
                    <li key={ item.key } className={ view === item.key ? '--active' : '' }>
                        <button onClick={ () => onChange(item.key)}>
                            {item.icon}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
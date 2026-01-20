import "@styles/components/headerbar.scss";
import { Beer, Coffee, PubSign, Sandwich, Soft } from "../utils/coloredIcons";

export function ListHeaderBar({ view, onChange } : { view: string, onChange: (v: string) => void}) {
    const list = [
        { key: 'beers', icon: <Beer size={'50'} />, title: 'Bières' },
        { key: 'softs', icon: <Soft size={'50'} />, title: 'Softs' },
        { key: 'foods', icon: <Sandwich size={'50'} />, title: 'Nourritures' },
        { key: 'coffee', icon: <Coffee size={'50'} />, title: 'Cafés' },
        { key: 'locations', icon: <PubSign size={'50'} />, title: 'Bars' }
    ];
    return (
        <header className="headerbar">
            <ul className="headerbar__list">
                {list.map(item => (
                    <li key={ item.key } className={ view === item.key ? '--active' : '' }>
                        <button onClick={ () => onChange(item.key)}>
                            {item.icon}<span>{item.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </header>
    )
}
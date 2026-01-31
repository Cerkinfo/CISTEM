import { getTranslations } from "@pkg/utils/string";
import "@styles/components/buttons/switcher-button.scss"

export function SwitcherButton({ current, choices, onSelect } : {
    current: string,
    choices: string[],
    onSelect: (s: string) => void;
}) {
    return (
        <div className="switcher">
            {choices.map(choice => {return (
                <button onClick={() => onSelect(choice)} className={choice === current ? '--active' : ''} key={choice}>
                    {getTranslations(choice)}
                </button>
            )})}
        </div>
    )
}
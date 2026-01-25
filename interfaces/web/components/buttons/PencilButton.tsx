import "@styles/components/buttons/pencil-button.scss"
import { PencilSquare } from "../utils/icons";

export function PencilButton({ action } : { action: any }) {
    return (
        <button className="pencil" onClick={() => action}>
            <PencilSquare size={'20'} />
        </button>
    )
}
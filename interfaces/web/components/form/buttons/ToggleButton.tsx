import "@styles/components/buttons/toggle-button.scss"

export function ToggleButton() {
    return (
        <label className="switch">
            <input type="checkbox"/>
            <span className="slider round"></span>
        </label>
    )
}
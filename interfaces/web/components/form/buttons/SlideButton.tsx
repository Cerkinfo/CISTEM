import "@styles/components/buttons/slide-button.scss"

export function SlideButton({ text, onClick } : { text: string, onClick: () => void}) {
    return(
        <div className="frame">
            <button className="custom-btn btn-15" onClick={() => onClick()}>
                {text}
            </button>
        </div>
    )
}
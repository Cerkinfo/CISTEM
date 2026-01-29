import "@styles/components/component-line.scss"

export function ComponentLine({ component, quantity } : { component: any, quantity: any }) {
    return (
        <div className="component-line">
            <img src={component.image} alt={component.id} />
            <div className="component-text">
                <h4>{component.name}</h4>
                <p>× {quantity}</p>
            </div>
        </div>
    )
}
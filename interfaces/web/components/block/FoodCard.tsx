import "@styles/components/food-card.scss"

export function FoodCard({ name, image, price, description } : {
    name: string,
    image: string,
    price: string,
    description?: string
}) {
    return (
        <div className="main">
            <div className="card">
                <div className="card_image"><img src={image} alt={name} /></div>
                <div className="card_content">
                    <h2 className="card_title">{name} <span className="orange">&#x2022; {price} €</span></h2>
                    <div className="card_text">
                        <p>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
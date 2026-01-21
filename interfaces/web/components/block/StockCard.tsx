import "@styles/components/stock-card.scss"
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

export function StockCard({ image, title, per_crate, quantity } : {
    image: string,
    title: string,
    per_crate: number,
    quantity: number
}) {
    return (
        <div className="stock-card">
            <Card className="card" 
            style={{
                width: "100%"
            }}>
                <img src={ image } />
                <CardBody>
                    <CardTitle tag="h3">
                        {title}
                    </CardTitle>
                    <CardSubtitle>
                        Packed by {per_crate} unity
                    </CardSubtitle>
                    <CardText>
                        Stock quantity : {quantity}
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )
}
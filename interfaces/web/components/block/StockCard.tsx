import "@styles/components/stock-card.scss"
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { Box } from "../utils/icons";

export function StockCard({ image, title, per_crate, quantity, available } : {
    image: string,
    title: string,
    per_crate: number,
    quantity: number,
    available: boolean
}) {
    return (
        <div className="stock-card">
            <Card className="card" 
            style={{
                width: "100%"
            }}>
                <img src={ image } />
                {quantity === 0 && <img src='/out_of_stock.png' className="out_of_stock" />}
                <CardBody>
                    <CardTitle>
                        <h3>{title}</h3>
                        <div className="stock">
                            <Box size={'20'} />
                            <span>{quantity} x {per_crate}</span>
                        </div>
                    </CardTitle>
                    {available &&
                        <CardText>
                            <Button outline color="danger">-</Button>
                            0
                            <Button outline color="success">+</Button>
                        </CardText>
                    }
                </CardBody>
            </Card>
        </div>
    )
}
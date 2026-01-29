import "@styles/components/stock-card.scss"
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { Box } from "../utils/icons";
import { useAction } from "@pkg/hooks/action/useAction";

export function StockCard({ id, image, title, per_crate, quantity, available } : {
    id: string,
    image: string,
    title: string,
    per_crate: number,
    quantity: number,
    available: boolean
}) {
    const { increment, decrement, order } = useAction()
    function getQuantity(order: Array<Record<string, number>>, id: string): number {
        const item = order.find(o => Object.keys(o)[0] === id)
        return item ? Object.values(item)[0] : 0
    }
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
                            <Button outline color="danger" onClick={() => decrement(id)}>-</Button>
                            {getQuantity(order, id)}
                            <Button outline color="success" onClick={() => increment(id)}>+</Button>
                        </CardText>
                    }
                </CardBody>
            </Card>
        </div>
    )
}
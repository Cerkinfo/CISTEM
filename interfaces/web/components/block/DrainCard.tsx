import { useItem } from "@pkg/hooks/fetch/getItem";
import { Card, CardBody, CardFooter, CardText, CardTitle } from "reactstrap";
import "@styles/components/drain-card.scss"
import { formatDateTime } from "@pkg/utils/date";

export function DrainCard({ drain } : { drain: any }) {
    const { item: user, isLoading } = useItem({tableName: 'users', key: drain.last_scanner, subscribe: true})
    return (
        <Card className="drain-card">
            <img src={drain.image} alt={drain.id} />
            <CardBody>
                <CardTitle tag="h5">
                    {drain.name}
                </CardTitle>
                <CardText>
                    {drain.description}
                </CardText>
            </CardBody>
            <CardFooter>
                {isLoading ? <p>Loading...</p> : <>
                    <h6>Last Scan by : </h6>
                    <div className="user-footer">
                        <img src={user.image} alt={user.id} />
                        <span>{user.pseudo}</span>
                    </div>
                    <p>{formatDateTime(drain.updated_at).date} {formatDateTime(drain.updated_at).time}</p>
                </>}
            </CardFooter>
        </Card>
    )
}
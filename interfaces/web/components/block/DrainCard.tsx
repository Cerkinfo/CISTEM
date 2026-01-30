import { useItem } from "@pkg/hooks/fetch/getItem";
import { Card, CardBody, CardFooter, CardText, CardTitle } from "reactstrap";
import "@styles/components/drain-card.scss"
import { formatDateTime } from "@pkg/utils/date";
import { useLanguage } from "@pkg/contexts/LanguageContext";
import { useEffect, useState } from "react";

export function DrainCard({ drain } : { drain: any }) {
    const { t } = useLanguage();
    const { item: user, isLoading } = useItem({tableName: 'users', key: drain.last_scanner, subscribe: true})

    const [timeWarning, setTimeWarning] = useState(false)

    useEffect(() => {
        if (!drain?.updated_at) return;
        const check = () => {
            const diff =
            Date.now() - new Date(drain.updated_at).getTime();
            setTimeWarning(diff > 30 * 60 * 1000);
        };
        check();
        const interval = setInterval(check, 60 * 1000);
        return () => clearInterval(interval);
    }, [drain.updated_at]);

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
                    {timeWarning ? (
                        <em style={{color: 'red'}}>
                            Dernier scan +30min
                        </em>
                    ) : (
                        <em style={{color : 
                            drain.status === 'EMPTY' ? '#0e94e2ff'
                            : drain.status === 'SUFFICIENT' ? '#e78a11ff' : '#3fdf1fff'}}
                        >
                            {t(drain.status)}
                        </em>
                    )}
                    <p>{formatDateTime(drain.updated_at).date} {formatDateTime(drain.updated_at).time}</p>
                </>}
            </CardFooter>
        </Card>
    )
}
import Loading from "@front/components/utils/Loading";
import { useInformationsList } from "@pkg/hooks/list/getInformations"
import { Col, Container, Row } from "reactstrap";
import "@styles/pages/benevoles.scss"
import { Link } from "react-router-dom";
import { useLanguage } from "@pkg/contexts/LanguageContext";

export function Benevoles() {
    const { list: users, isLoading } = useInformationsList({tableName: 'users', subscribe: true});
    const { t } = useLanguage();
    return (
        <>
        <section className="section section-lg section-shaped pg-250 m-0 benevoles">
        {isLoading ? 
            <div className="flex justify-center items-center" style={{ margin: '150px' }}>
                <Loading /> 
            </div>
        : (
            <Container fluid>
                <Row>
                    {users.map((user: any) => { return (
                        <Col md='3'>
                        <Link to={`/profile/${user.pseudo}`} >
                            <div className="user">
                                <img src={user.image} alt={user.pseudo} />
                                <div className="user-infos">
                                    <h1>{user.pseudo}</h1>
                                    <p>{t(user.role)}</p>
                                </div>
                            </div>
                        </Link>
                        </Col>
                    )})}
                </Row>

            </Container>
        )}
        </section>
        </>
    )
}
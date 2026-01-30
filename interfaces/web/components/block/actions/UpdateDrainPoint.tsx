import { ComponentDropdown } from "@front/components/form/dropdown/ComponentDropdown";
import { useItem } from "@pkg/hooks/fetch/getItem";
import { useFormState } from "@pkg/hooks/form/useFormState";
import { useDrainScanned } from "@pkg/hooks/update/updateDrain";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import { Button, Col, Container, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"

export function UpdateDrainPoint({ id } : { id: string }) {
    const navigate = useNavigate();
    const { item: drain, isLoading: ili } = useItem({tableName: 'drain', key: id})
    const { updateDrainScanned, data, isLoading: ild } = useDrainScanned();

    const form = useFormState({
        id: id,
        status: 'EMPTY'
    })

    useEffect(() => {
        if (data) navigate('/drain')
    }, [data])

    return (
        <section className="add-drain">
            <Modal isOpen={true} size="xl" unmountOnClose={true}>
                <ModalHeader>
                    Mettre à jour un bac à vidange
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Container fluid>
                        <Row style={{display:'flex', alignItems: 'center'}}>
                            <Col md="3">
                            <img src={drain?.image} alt={drain?.id} />
                            </Col><Col md="9" style={{display:'flex', flexDirection: 'column', gap: '15px'}}>
                                <h3>{drain?.name} : </h3>
                                <ComponentDropdown 
                                    list={['EMPTY', 'SUFFICIENT', 'EMPTIED']}
                                    current={form.values["status"]}
                                    onChange={ function (s: string) {form.set('status', s)}} 
                                />
                            </Col>
                        </Row>
                        </Container>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="danger" onClick={() => navigate('/drain')}>
                        Cancel
                    </Button>
                    <Button outline color="success" onClick={() => updateDrainScanned(form.values)}>
                        {(ili || ild) ? 'Loading...' : 'Edit'}
                    </Button>
                </ModalFooter>
            </Modal>
        </section>
    )
}
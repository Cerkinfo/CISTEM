import { ImageInput } from "@front/components/form/inputs/ImageInput";
import { TextInput } from "@front/components/form/inputs/TextInput";
import Separator from "@front/components/headers/Separator";
import { useFormState } from "@pkg/hooks/form/useFormState";
import { useDrainCreate } from "@pkg/hooks/update/createDrain";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import { Button, Col, Container, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"

export function AddDrainPoint({ id } : { id: string }) {
    const navigate = useNavigate();
    const { updateDrainForCreate, data, isLoading } = useDrainCreate()

    const formInfos = useFormState({
        id: id,
        name: "",
        description: "",
        image: null as File | string | null
    })

    function onChange(key: any, value: any) {
        if (Object.keys(formInfos.values).includes(key)) formInfos.set(key, value);
    }

    useEffect(() => {
        if (data) navigate('/drain')
    }, [data])

    return (
        <section className="add-drain">
            <Modal isOpen={true} size="xl" unmountOnClose={true}>
                <ModalHeader>
                    Ajouter un bac à vidange
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Separator title="Vidange" />
                        <Container fluid>
                        <Row style={{display:'flex', alignItems: 'center'}}>
                            <Col md="3">
                            <ImageInput 
                                name="image"
                                image={formInfos.values["image"]}
                                setImage={ function (img: File) {formInfos.set("image", img)} }
                            />
                            </Col><Col md="9" style={{display:'flex', flexDirection: 'column', gap: '15px'}}>
                            <TextInput name="name" placeholder="Simple mais efficace pour l'identifier" form={formInfos} onChange={ onChange }  />
                            <TextInput name="description" placeholder="Plus d'informations sur son emplacement" form={formInfos} onChange={ onChange }  />
                            </Col>
                        </Row>
                        </Container>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <p>ATTENTION ! Vérifie bien toutes les réponses car si il n'y a pas de vérification ici mais l'erreur sera provoquée au niveau du serveur et tu devras tout recommencer !</p>
                    <Button outline color="danger" onClick={() => navigate('/drain')}>
                        Cancel
                    </Button>
                    <Button outline color="success" onClick={() => updateDrainForCreate(formInfos.values)}>
                        {isLoading ? 'Loading...' : 'Add'}
                    </Button>
                </ModalFooter>
            </Modal>
        </section>
    )
}
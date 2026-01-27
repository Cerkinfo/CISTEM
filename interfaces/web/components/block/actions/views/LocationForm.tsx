import {Col, Container, Form, Row } from "reactstrap";
import Separator from "../../../headers/Separator";
import { useFormState } from "@pkg/hooks/form/useFormState";
import { TextInput } from "@front/components/form/inputs/TextInput";
import { ImageInput } from "@front/components/form/inputs/ImageInput";

export function LocationForm ({ data } : { data?: any }) {
  const formInfos = useFormState({
    name: data?.name || "",
    prefix: data?.prefix || "",
    orders: data?.orders || "",
    image: data?.image || null as File | string | null
  })

  function onChange(key: any, value: any) {
    if (Object.keys(formInfos.values).includes(key)) formInfos.set(key, value);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formInfos);
  };
  
  return (
    <>
        <Form onSubmit={ handleSubmit }>

            <Separator title="General" />
            <Container fluid>
            <Row style={{display:'flex', alignItems: 'center'}}>
                <Col md="3">
                <ImageInput 
                    name="image"
                    image={formInfos.values["image"]}
                    setImage={ function (img: File) {formInfos.set("image", img)} }
                    label="Facultatif : auto-généré à la création"
                />
                </Col><Col md="9" style={{display:'flex', flexDirection: 'column', gap: '15px'}}>
                <TextInput name="name" form={formInfos} onChange={ onChange }  />
                <TextInput name="prefix" placeholder="Example : CI" form={formInfos} onChange={ onChange }  />
                <TextInput name="orders" placeholder="Default: 0" form={formInfos} onChange={ onChange }  />
                </Col>
            </Row>
            </Container>

        </Form>
    </>
  );
}

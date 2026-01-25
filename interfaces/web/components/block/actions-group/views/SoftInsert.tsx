import {Col, Container, Form, Row } from "reactstrap";
import Separator from "../../../headers/Separator";
import { useFormState } from "@pkg/hooks/form.ts/useFormState";
import { TextInput } from "@front/components/form/inputs/TextInput";
import { ImageInput } from "@front/components/form/inputs/ImageInput";

export function SoftInsert () {
  const formInfos = useFormState({
    name: "",
    volume: "",
    image: null as File | null,
    price: ""
  })
  const formStock = useFormState({
    entityPerCrate: "",
    stockCrates: ""
  })

  function onChange(key: any, value: any) {
    if (key === typeof formInfos) formInfos.set(key, value);
    else if (key === typeof formStock) formStock.set(key, value);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formInfos, formStock);
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
              />
            </Col><Col md="9" style={{display:'flex', flexDirection: 'column', gap: '15px'}}>
              <TextInput name="name"  placeholder="Example : Club-Mate" form={formInfos} onChange={ onChange }  />
              <TextInput name="volume" label="Volume (cl)" placeholder="Example : 25" form={formInfos} onChange={ onChange } />
            </Col>
          </Row>
        </Container>

        <Separator title="Sale" />
        <Container fluid>
          <Row>
            <Col style={{display:'flex', flexDirection: 'column', gap: '15px'}}>
              <TextInput name="price" label="Price (€)" placeholder="Example : 2.5" form={formInfos} onChange={ onChange } />
              <TextInput name="entityPerCrate" label="Bottles per crate" placeholder="Example : 24" form={formStock} onChange={ onChange } />
              <TextInput name="stockCrates" label="Stock crates" placeholder="Example : 10" form={formStock} onChange={ onChange } />
            </Col>
          </Row>
        </Container>

      </Form>
    </>
  );
}

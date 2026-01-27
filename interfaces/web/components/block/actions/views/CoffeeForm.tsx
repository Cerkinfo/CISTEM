import {Col, Container, Form, Row } from "reactstrap";
import Separator from "../../../headers/Separator";
import { useFormState } from "@pkg/hooks/form/useFormState";
import { TextInput } from "@front/components/form/inputs/TextInput";
import { ImageInput } from "@front/components/form/inputs/ImageInput";
import { useState } from "react";
import { DrinkCard } from "../../DrinkCard";
import { SwitcherButton } from "@front/components/form/buttons/SwitchButton";

export function CoffeeForm ({ data } : { data?: any }) {
  const formInfos = useFormState({
    name: data?.name || "",
    image: data?.image || null as File | string | null,
    price: data?.price || "",
    price_large: data?.price_large || ""
  })

  function onChange(key: any, value: any) {
    if (Object.keys(formInfos.values).includes(key)) formInfos.set(key, value);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formInfos);
  };

  const [view, setView] = useState<string>('Form')
  
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <SwitcherButton current={view} choices={['Form', 'Preview']} onSelect={setView} />
      </div>

      {view === 'Preview' ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <DrinkCard
            name={formInfos.values["name"]}
            image={formInfos.values["image"]}
            price={formInfos.values["price"]}
            price2={formInfos.values["price_large"]}
            coffee
          />
        </div>
      ) : (
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
                <TextInput name="name"  placeholder="Example : Espresso" form={formInfos} onChange={ onChange }  />
                <TextInput name="price" placeholder="Example : 2.5" form={formInfos} onChange={ onChange } />
                <TextInput name="price_large" label="Prix Large" placeholder="Example : 4.5" form={formInfos} onChange={ onChange } />
              </Col>
            </Row>
          </Container>

        </Form>
      )}
    </>
  );
}

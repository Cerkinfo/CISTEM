import {Col, Container, Form, Row } from "reactstrap";
import Separator from "../../../headers/Separator";
import { useFormState } from "@pkg/hooks/form/useFormState";
import { TextInput } from "@front/components/form/inputs/TextInput";
import { ImageInput } from "@front/components/form/inputs/ImageInput";
import { useEffect, useState } from "react";
import { useItem } from "@pkg/hooks/fetch/getItem";
import { DrinkCard } from "../../DrinkCard";
import { SwitcherButton } from "@front/components/form/buttons/SwitchButton";

export function MaterialForm({ data } : { data?: any }) {
  const [materialId, _] = useState(data?.id);
  const { item: stock, isLoading: ils } = useItem({tableName: "stock_materials", key: materialId});
  const [stateStock, setStock] = useState(null);
  
  useEffect(() => {if (!ils) setStock(stock)}, [ils, stock]);

  const formInfos = useFormState({
    name: data?.name || "",
    description: data?.description || "",
    image: data?.image || null as File | string | null,
    price: data?.price || ""
  })
  const formStock = useFormState({
    entity_per_crate: "",
    stock: ""
  })

  function onChange(key: any, value: any) {
    if (Object.keys(formInfos.values).includes(key)) formInfos.set(key, value);
    else if (Object.keys(formStock.values).includes(key)) formStock.set(key, value);
  }

  useEffect(() => {
    if (stateStock) {
      Object.entries(stateStock).forEach(([key, value]) => {
        if(key !== "id") formStock.set(key as any, value ?? "");
      });
    }
  }, [stateStock]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formInfos, formStock);
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
                <TextInput name="name"  placeholder="Example : Eco-cup" form={formInfos} onChange={ onChange }  />
                <TextInput name="description" placeholder="Example : None is the best dev & president ever" form={formInfos} onChange={ onChange } />
              </Col>
            </Row>
          </Container>

          <Separator title="Sale" />
          <Container fluid>
            <Row>
              <Col style={{display:'flex', flexDirection: 'column', gap: '15px'}}>
                <TextInput name="price" label="Price (€)" placeholder="Example : 2.5" form={formInfos} onChange={ onChange } />
                <TextInput name="entity_per_crate" label="Quantity per crate" placeholder="Example : 24" form={formStock} onChange={ onChange } />
                <TextInput name="stock" label="Stock crates" placeholder="Example : 10" form={formStock} onChange={ onChange } />
              </Col>
            </Row>
          </Container>

        </Form>
      )}
    </>
  );
}

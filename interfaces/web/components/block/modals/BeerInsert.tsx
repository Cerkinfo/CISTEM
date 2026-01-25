import {Col, Container, Form, Row } from "reactstrap";
import Separator from "../../headers/Separator";
import { useFormState } from "@pkg/hooks/form.ts/useFormState";
import { capitalize } from "@pkg/utils/string";
import { TextInput } from "@front/components/form/inputs/TextInput";
import { ImageInput } from "@front/components/form/inputs/ImageInput";

export function BeerInsert () {
  const formInfos = useFormState({
    name: "",
    type: "",
    volume: "",
    alcohol: "",
    description: "",
    image: null as File | null,
    price: ""
  })
  const formTaste = useFormState({
    bitterness: "",
    power: "",
    roundness: "",
    fruity: "",
    liveliness: "",
    acidity: ""
  })
  const formFlavors = useFormState({
    visual: "",
    smell: "",
    taste: ""
  })
  const formStock = useFormState({
    bottlesPerCrate: "",
    stockCrates: ""
  })

  function onChange(key: any, value: any) {
    if (key === typeof formInfos) formInfos.set(key, value);
    else if (key === typeof formTaste) formTaste.set(key, value);
    else if (key === typeof formFlavors) formFlavors.set(key, value);
    else if (key === typeof formStock) formStock.set(key, value);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formInfos, formTaste, formFlavors, formStock);
  };

  return (
    <>
      <p>
        Rends-toi sur <a href="https://www.vandb.fr/biere/">vandb.fr</a>, trouve la bière à ajouter et renseigne
        toutes les informations dans le formulaire ci-dessous.
      </p>
      <p>! Attention n'oublie pas de traduire les textes en anglais !</p>
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
              <TextInput name="name"  placeholder="Example : Jupiler" form={formInfos} onChange={ onChange }  />
              <TextInput name="type" placeholder="Example : Blonde Lager" form={formInfos} onChange={ onChange } />
              <TextInput name="volume" label="Volume (cl)" placeholder="Example : 25" form={formInfos} onChange={ onChange } />
              <TextInput name="alcohol" label="Alcohol (%)" placeholder="Example : 5.2" form={formInfos} onChange={ onChange } />
              <TextInput name="description" placeholder="Example : Jupiler is a very good beer" form={formInfos} onChange={ onChange } />
            </Col>
          </Row>
        </Container>

        <Separator title="Taste" />
        <p style={{ fontSize: "13px" }}>
          Sorry la manip est un peu relou mais sans scraping pas d'autre solution pour l'instant...
        </p>
        <p style={{ fontSize: "13px", marginTop:"-12px" }}>
          Ctrl + U (Code Source) & Ctrl + F (Recherche) & "Description" -&gt; Prendre la valeur "aria-valuenow"
        </p>
        <Container fluid>
          <Row>
            <Col style={{display:'flex', flexDirection: 'column', gap: '15px'}}>
              {Object.keys(formTaste.values).map((field) => (
                <TextInput
                    key={field}
                    name={field}
                    label={`${capitalize(field)} (%)`}
                    placeholder={`Example : 30`}
                    form={formTaste}
                    onChange={ onChange }
                  />
                )
              )}
            </Col>
          </Row>
        </Container>

        <Separator title="Flavors" />
        <Container fluid>
          <Row>
            <Col style={{display:'flex', flexDirection: 'column', gap: '15px'}}>
            {Object.keys(formFlavors.values).map((field) => (
              <TextInput
                key={field}
                name={field}
                placeholder={`Example : Malte, houblon, levure`}
                form={formFlavors}
                onChange={ onChange }
              />
            ))}
            </Col>
          </Row>
        </Container>

        <Separator title="Sale" />
        <Container fluid>
          <Row>
            <Col style={{display:'flex', flexDirection: 'column', gap: '15px'}}>
              <TextInput name="price" label="Price (€)" placeholder="Example : 2.5" form={formInfos} onChange={ onChange } />
              <TextInput name="bottlesPerCrate" label="Bottles per crate" placeholder="Example : 24" form={formStock} onChange={ onChange } />
              <TextInput name="stockCrates" label="Stock crates" placeholder="Example : 10" form={formStock} onChange={ onChange } />
            </Col>
          </Row>
        </Container>

      </Form>
    </>
  );
}

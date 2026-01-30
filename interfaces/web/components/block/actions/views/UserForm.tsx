import {Button, Col, Container, Form, Row } from "reactstrap";
import Separator from "../../../headers/Separator";
import { useFormState } from "@pkg/hooks/form/useFormState";
import { TextInput } from "@front/components/form/inputs/TextInput";
import { ImageInput } from "@front/components/form/inputs/ImageInput";
import { ComponentDropdown } from "@front/components/form/dropdown/ComponentDropdown";
import { ROLE, type Role } from "@pkg/types/Auth";
import { useUserInsert } from "@pkg/hooks/insert/user";

export function UserForm ({ data } : { data?: any }) {
  const formInfos = useFormState({
    email: data?.email || "",
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    pseudo: data?.pseudo || "",
    role: data?.role || "BENEVOLE",
    image: data?.image || null as File | string | null
  })

  function onChange(key: any, value: any) {
    if (Object.keys(formInfos.values).includes(key)) formInfos.set(key, value);
  }

  const { insertUser, isLoading } = useUserInsert()
  async function handleSubmit() {
    await insertUser(formInfos.values)
  }
  
  return (
    <>
        <Form>
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
                <TextInput name="email" placeholder="Servira pour se connecter" form={formInfos} onChange={ onChange }  />
                <TextInput name="first_name" label="Prénom" form={formInfos} onChange={ onChange }  />
                <TextInput name="last_name" label="Nom de famille" form={formInfos} onChange={ onChange }  />
                <TextInput name="pseudo" placeholder="Facultatif : auto-généré à la création" form={formInfos} onChange={ onChange }  />
                <ComponentDropdown list={ROLE} current={formInfos.values["role"]} onChange={function (r: Role) {formInfos.set("role", r)}} />
                </Col>
            </Row>
            </Container>
        </Form>
        <Button outline color="danger" onClick={() => {}}>
            Cancel
        </Button>
        <Button outline color="success" type='submit' onClick={() => handleSubmit()} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Add'}
        </Button>
    </>
  );
}

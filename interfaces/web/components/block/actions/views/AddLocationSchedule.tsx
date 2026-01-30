import { ComponentDropdown } from "@front/components/form/dropdown/ComponentDropdown";
import { useInformationsList } from "@pkg/hooks/fetch/getInformations";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export function AddLocationSchedule({ schedule, isOpen, close } : {
    schedule: any,
    append: (...args: any[]) => any,
    isOpen: boolean, 
    close: (b: boolean) => void
}) {
    const { list: locations } = useInformationsList({tableName: 'locations'})
    const [current, setCurrent] = useState('');
    return (
        <Modal isOpen={isOpen} size="xl" unmountOnClose={true}>
            <ModalHeader>
                Ajouter une tranche horaire
            </ModalHeader>
                <ModalBody>
                    <ComponentDropdown list={locations} current={current} onChange={ setCurrent } />
                </ModalBody>
            <ModalFooter>
                <Button outline color="danger" onClick={() => close(false)}>
                    Cancel
                </Button>
                <Button outline color="success" onClick={() => {schedule.length === 0}} >
                    Add
                </Button>
            </ModalFooter>
        </Modal>
    )
}
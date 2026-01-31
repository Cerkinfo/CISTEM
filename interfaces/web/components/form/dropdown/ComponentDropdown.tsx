import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import "@styles/components/form/dropdown.scss"
import { getTranslations } from "@pkg/utils/string";

export function ComponentDropdown({ list, current, onChange } : { list: any, current: any, onChange: (s: any) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {setIsOpen((prevState) => !prevState); if(current) onChange('')};

    return (
        <div className="component-dropdown">
            <Dropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle>{getTranslations(current) || 'Choisis le composent à éditer'}</DropdownToggle>
                <DropdownMenu {...list} updateOnSelect>
                    {list.map((el: any) => { return (
                        <DropdownItem onClick={() => onChange(el)}>
                            { el.pseudo ? el.pseudo : el.name ? el.name : getTranslations(el)}
                        </DropdownItem>
                    )})}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
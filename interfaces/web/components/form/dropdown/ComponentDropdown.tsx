import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import "@styles/components/form/dropdown.scss"

export function ComponentDropdown({ list, current, onChange } : { list: any, current: any, onChange: (s: any) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {setIsOpen((prevState) => !prevState); if(current) onChange('')};

    return (
        <div className="component-dropdown">
            <Dropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle>{current.name || 'Choisis le composent à éditer'}</DropdownToggle>
                <DropdownMenu {...list} updateOnSelect>
                    {list.map((el: any) => { return (
                        <DropdownItem onClick={() => onChange(el)}>
                            {el.name}
                        </DropdownItem>
                    )})}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
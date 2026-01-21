import "@styles/components/drink-card.scss"
import CISTEM from "../utils/CISTEM"
import { DrinkToolBar } from "../bar/DrinkToolBar"
import { useState, type ReactNode } from "react"

function Modal({ isOpen, content } : { isOpen: boolean, content: ReactNode }) {
    if(!isOpen) return null;
    return (
        <div className="__modal">
            {content}
        </div>
    )
}

export function DrinkCard({ name, image, price, price2, list, coffee } : { 
    name: string,
    image: string,
    price: string,
    price2?: string,
    list?: any,
    coffee?: boolean
}) {
    const [listView, setListView] = useState('main');

    return (
        <div className="container_">
            {list && <Modal 
                isOpen={listView !== 'main'}
                content={list.find((item: any) => (item.key) === listView).content} 
            />}
            <div className="content">
                <div className="logo">
                    {coffee 
                    ?   <img src='/coffee_factory.png' />
                    : (
                        <div className="img">
                            <CISTEM size={45} only={'text'} />
                        </div>
                    )}
                </div>
                <div className="hamburger">
                    <img src="/cerkinfo_logo.png" />
                </div>
                <div className="text">
                    <p><em>FOSDEM <br/> Bar <br/> &#xA0; </em></p> 
                </div>
                <div className="beverage">
                    <img src={image} alt=""/> 
                </div>
                <div className="price">
                    <h3>{price2}</h3>
                    <h2>{price} €</h2>
                </div>
                <div className="button">
                    {list && <DrinkToolBar view={listView} onChange={setListView} list={list} />}
                </div>
                <p className="mens">{ name }</p>
            </div>
        </div>
    )
}
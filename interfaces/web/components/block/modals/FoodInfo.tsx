import { Center, H3 } from "@styles/components/titles";
import { Info } from "@front/components/utils/icons";

export const FoodInfoView = ({ title, ingredients } : { title : string, ingredients: string }) => {
    return (
        <>
        <Center style={{fontSize:'18px'}}>
            <br/>
            <H3>{title}</H3>
            <br/>
            <p><span style={{color:'SpringGreen'}}><Info size='30'/></span> Ingredients: {ingredients}</p>
        </Center>
        </>
    )
}
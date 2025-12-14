import { Center, H3 } from "@styles/components/titles";
import { BeerColored, Handshake, Info } from "@front/components/utils/icons";

export const InfoView = ({ title, type, alc, desc } : {
    title : string,
    type: string | null,
    alc : number | null,
    desc : string | null
}) => {
    return (
        <>
        <Center style={{fontSize:'18px'}}>
            <br/>
            <H3>{title}</H3>
            <br/>
            <p><BeerColored size='30'/> {type}</p>
            <p><Handshake size='30'/> ALC. {alc} % VOL.</p>
            <p><span style={{color:'SpringGreen'}}><Info size='30'/></span> {desc}</p>
        </Center>
        </>
    )
}
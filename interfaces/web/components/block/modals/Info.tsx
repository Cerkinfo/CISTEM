import { Handshake, Info } from "@front/components/utils/icons";
import { Beer } from "@front/components/utils/coloredIcons";
import { H3 } from "@front/styles/components/titles";

export const InfoView = ({ title, type, alc, desc } : {
    title : string,
    type: string | null,
    alc : number | null,
    desc : string | null
}) => {
    return (
        <>
            <H3>{title}</H3>
            <br/>
            <p><Beer size='30'/> {type}</p>
            <p><Handshake size='30'/> ALC. {alc} % VOL.</p>
            <p><span style={{color:'SpringGreen'}}><Info size='30'/></span> {desc}</p>
        </>
    )
}
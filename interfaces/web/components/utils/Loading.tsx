import SvgNotReversed from "./SvgNotReversed";
import "@front/styles/anims/loading.scss";

export default function () {
    return (
        <div className="">
            <SvgNotReversed src="/cistem.svg" className="loading w-16 h-16" />
        </div>
    )
}
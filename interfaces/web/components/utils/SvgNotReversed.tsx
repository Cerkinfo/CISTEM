import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { ReactSVG } from "react-svg";

interface SvgNotReversedProps {
    src: string;
    className?: string;
    style?: CSSProperties;
}

export default function ({src, className, style}: SvgNotReversedProps) {
    const logoRef = useRef<SVGSVGElement | null>(null);

    const applyFilter = (svg: SVGSVGElement | null) => {
        if (!svg) return;
        const isDark = document.documentElement.classList.contains('dark');
        svg.style.filter = isDark ? 'invert(1) hue-rotate(180deg)' : 'none';
    };

    useEffect(() => {
        const observer = new MutationObserver(() => {
            applyFilter(logoRef.current);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const makeAfterInjection = (ref: typeof logoRef) => {
        return (svg?: SVGSVGElement) => {
            if (!svg) return;
            ref.current = svg || null;
            applyFilter(ref.current);
        };
    };
    
    return <ReactSVG src={src} className={className} style={style} afterInjection={makeAfterInjection(logoRef)} />
}
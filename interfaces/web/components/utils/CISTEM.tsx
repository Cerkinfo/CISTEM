import { useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg'

export default function ({size}: {size: number}) {
    const textWidth = size * 2.4;
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
    
    return (
        <div className='container-title' >
            <div className="logo" style={{ width: size-50, height: size-50, flexShrink: 0 }}>
                <ReactSVG src="/cistem.svg" afterInjection={makeAfterInjection(logoRef)} />
            </div>
            <div className="text" style={{ width: textWidth, height: size, flexShrink: 0 }}>
                <ReactSVG src="/cistem-text.svg" />
            </div>
        </div>
    )
}
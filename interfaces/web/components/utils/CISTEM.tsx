import { ReactSVG } from 'react-svg'

export default function ({size, only, color}: {size: number, only?: 'text' | 'logo', color?: string}) {
    const textWidth = size * 2.4;
    
    return (
        <div style={{color: color || 'inherit' }}>
        {only === 'logo' ? (
            <div className="logo" style={{ width: size, height: size, flexShrink: 0 }}>
                <ReactSVG src="/cistem.svg" />
            </div>
        ) : only === 'text' ? (
            <div className="text" style={{ width: textWidth, height: size, flexShrink: 0 }}>
                <ReactSVG src="/cistem-text.svg" />
            </div>
        ) : 
        <div className='container-title' >
            <div className="logo" style={{ width: size-50, height: size-50, flexShrink: 0 }}>
                <ReactSVG src="/cistem.svg" />
            </div>
            <div className="text" style={{ width: textWidth, height: size, flexShrink: 0 }}>
                <ReactSVG src="/cistem-text.svg" />
            </div>
        </div>
        }
        </div>
    )
}
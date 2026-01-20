import { useState, type JSX } from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

const Style = styled.div`
    .tab1 {
        .btn-icon {
            z-index: 0;
            margin-left: -40px;
        }
        .btn0 {
            margin-top: 25px;
        }
        .collapse {
            background-color: white;
            z-index: 1;
            position: absolute;
            width: 325px;
            height: 450px;
            top: 20px;
            left: -345px;
            border-radius: 18px;
            overflow: hidden;
            color: black;
        }
        .clp2 {
            top: -60px;
        }
        .clp3 {
            top: -110px;
        }
        .icon {
            margin-left: 30px;
            padding: 5px;    
        }
        .icon2 {
            margin-left: 20px;
            padding: 5px;
        }
        .icon3 {
            margin-left: 10px;
            padding: 5px;
        }
    }
`;

const Collapse = ({ isOpen, children, className } : {
    isOpen: boolean,
    children : React.ReactNode,
    className?: string
}) => (
    <div
        className={className}
        style={{
            opacity: isOpen ? 1 : 0,
            display: isOpen ? "flex" : "none",
            transition: "opacity 0.35s ease",
            flexDirection: "column"
        }}
    >
        {children}
    </div>
);

export type FolderTab = {
    icon: JSX.Element;
    content: JSX.Element | null;
    color?: string;
};

export const FolderInfo = ({ tabs } : { tabs: FolderTab[] }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <>
        <Style>
            <div className="tab1">
                {tabs.map((t, i) => {
                    const isOpen = openIndex === i;
                    const otherOpen = openIndex !== null && openIndex !== i;
                    const marginLeft = otherOpen ? (i === 2 ? '-80px' : '-100px') : undefined;
                    const btnClass = `btn-icon ${i > 0 ? '' : 'btn0'}`;
                    const clpClass = `collapse ${i === 1 ? 'clp2' : i === 2 ? 'clp3' : ''}`;

                    return (
                        <div key={i} style={{position: 'relative'}}>
                            <Button
                                color={(i === 0 ? 'info' : i === 1 ? 'warning' : 'danger')}
                                onClick={() => toggle(i)}
                                className={btnClass}
                                style={{
                                    ...(marginLeft ? { marginLeft } : {}),
                                    transition: 'margin 0.35s ease'
                                }}
                            >
                                <div className={i === 0 ? 'icon' : i === 1 ? 'icon2' : 'icon3'} style={{ color: t.color }}>
                                    {t.icon}
                                </div>
                            </Button>

                            <Collapse isOpen={isOpen} className={clpClass}>
                                {t.content}
                            </Collapse>
                        </div>
                    );
                })}
            </div>
        </Style>
        </>
    );
};
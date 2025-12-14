import { type ReactNode } from "react";
import styled from "styled-components";
import { Text } from "@front/styles/components/titles";

const Shadow = styled.div`
.card {
  width: auto;
  height: auto;
  padding: 0.5rem;
  background: rgba(198, 198, 198, 0.34);
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border-bottom: 3px solid rgba(255, 255, 255, 0.440);
  border-left: 2px  rgba(255, 255, 255, 0.545) outset;
  box-shadow: -40px 50px 30px rgba(0, 0, 0, 0.280);
}

.align {
  padding: 1rem;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-self: flex-start;
}

.red {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ff605c;
  box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.280);
}

.yellow {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffbd44;
  box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.280);
}

.green {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #00ca4e;
  box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.280);
}

.code {
    color: #00ca4e;
    font-size: 1.2rem;
    font-weight: bold;
    text-shadow: -10px 5px 10px rgba(0, 0, 0, 0.573);
}

.running {
    margin-left: -0.8rem;
    font-size: 1.1rem;
    font-weight: bold;
    text-shadow: -10px 5px 10px rgba(0, 0, 0, 0.573);
}

.card h1 {
  text-align: left;
  padding-left: 1.5rem;
  margin: 1.3rem;
  text-shadow: -10px 5px 10px rgba(0, 0, 0, 0.573);
}

.content {
    background: #353535;
    border-radius: 8px;
    color: white;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
`;

export const Window = ({ children, title } : {children: ReactNode, title: string}) => {
  return (
    <Shadow>
    <div className="card">
        <div className="align align-items-center">
            <span className="red"></span>
            <span className="yellow"></span>
            <span className="green"></span>
            <span style={{marginLeft:"15px", opacity:0.8}}>RTFM.sh</span>
        </div>
        <div className="content">
            <div className="row align-items-center">
                <div className="col-auto"><span className="code">{`cistem@fosdem $>`}</span></div>
                <div className="col-auto"><span className="running">./RTFM.sh</span></div>
            </div>

            <h1>{title}</h1>
            <p>
                <Text>{children}</Text>
            </p>
        </div>
    </div>
    </Shadow>
  );
}
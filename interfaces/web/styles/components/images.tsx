import styled from "styled-components";

export const Skew = styled.img`
  width: 100%;

  @media (min-width: 1024px) {
    clip-path: polygon(
      0 0,
      100% 0%,
      100% 100%,
      0% 100%,
      calc(0% + 40px) 70%,
      calc(0% + 30px) 50%
    );
  }
`;

export const Overlay = styled.span`
  display: flex;
  height: 100%;
`;

export const Floating = styled.span`
  position: absolute;
  padding: 0 15%;
  z-index: 1;
  top: 50%;
`;

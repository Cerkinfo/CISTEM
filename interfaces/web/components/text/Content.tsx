import { useEffect, useState } from "react";
import { Container, Spinner } from "reactstrap";
import styled from "styled-components";
import Loading from "../utils/Loading";

const Style = styled.div`
    margin: auto;
    @media {
      width: 95%;
    }
  h3 {
    font-family: "Fjalla One", sans-serif;
    font-weight: 600;
  }
  h5 {
    padding : 0.5rem 0.5rem 0.5rem 1rem;
    background: #353535;
    border-radius: 8px;
    color: white;
    padding: 1rem;
    text-shadow: -10px 5px 10px rgba(0, 0, 0, 0.573);
  }
  em {
    color: #00ca4e;
  }
  strong {
    font-weight: 600;
  }
  li {
    &:before {
      content: "•";
      color: #00ca4e;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }  
  }
`;

type Page = {
  bodyHtml: string;
};

const Content = (props: any) => {
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    if (props.file) {
      try {
        (async () => {
          try {
            const pages = import.meta.glob('../../../../packages/texts/json/*.json', { eager: true });
            const key = `../../../../packages/texts/json/${props.file}.json`;
            const mod = pages[key];
            setPage((mod as { default?: Page })?.default ?? (mod as Page) ?? null);
          } catch (err) {
            console.error('Import failed for content', err);
            setPage(null);
          }
        })();
      } catch (e) {
        console.error(`Could not find content for ${props.file}.json`, e);
      }
    }
  }, [props.file]);

  if (page) {
    return (
      <>
        <div className="h-100 justify-content">
            <Style>
            <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }}></div>
            </Style>
        </div>
      </>
    );
  } else {
    return (
      <Container className="d-flex justify-content-center align-items-center">
        {/* <Spinner style={{ width: "3rem", height: "3rem" }} /> */}
        <Loading />
      </Container>
    );
  }
};

export default Content;
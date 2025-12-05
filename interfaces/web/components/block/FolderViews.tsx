import { Center, H3 } from "../../styles/components/titles";
import { BeerColored, Eye, Handshake, Info, Mouth, Nose } from "../utils/icons";
import { Progress } from "reactstrap";
import type { Database } from "@db";
import type { JSX } from "react";

export const BeerInfoView = ({ title, type, alc, desc } : {
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

type TasteRow = Database["public"]["Tables"]["beers_taste"]["Row"];
type KeyOfTasteRow = keyof TasteRow;
export const BeerTasteView = ({ taste }: { taste: TasteRow | null }) => {
  if (!taste) {
    return (
      <Center style={{ fontSize: "18px" }}>
        <H3>Taste</H3>
        <p>Loading…</p>
      </Center>
    );
  }

  const capitalizeFirstLetter = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
  const keys = Object.keys(taste) as KeyOfTasteRow[];

  return (
    <Center style={{ fontSize: "18px" }}>
      <br />
      <H3>Taste</H3>
      <br />
      {keys.map((k) => {
        const raw = taste[k];
        let value: string | number | undefined =
          raw == null ? undefined : typeof raw === "number" ? raw : Number(raw) || undefined;

        return (
          <div key={String(k)} style={{ marginBottom: "12px" }}>
            <p style={{ marginBottom: "-3px" }}>{capitalizeFirstLetter(String(k))}</p>
            <Progress striped color="info" value={value} />
          </div>
        );
      })}
    </Center>
  );
};


type FlavorsRow = Database["public"]["Tables"]["beers_flavors"]["Row"];
type KeyOfFlavorsRow = keyof FlavorsRow;

export const BeerFlavorsView = ({ flavor }: { flavor: FlavorsRow }) => {
  if (!flavor) {
    return (
      <Center style={{ fontSize: "18px" }}>
        <H3>Flavors</H3>
        <p>Loading…</p>
      </Center>
    );
  }
  const keys = Object.keys(flavor) as KeyOfFlavorsRow[];

  const icons: Record<string, JSX.Element> = {
    visual: <Eye size="30" />,
    smell: <Nose size="30" />,
    taste: <Mouth size="30" />,
  };

  return (
    <Center style={{ fontSize: "18px" }}>
      <br />
      <H3>Flavors</H3>
      <br />
      {keys.map((k) => {
        const raw = flavor[k];

        let value: string | number | undefined;

        if (raw === null || raw === undefined) value = undefined;
        else if (typeof raw === "number") value = raw;
        else {
          const n = Number(raw);
          value = Number.isFinite(n) ? n : undefined;
        }

        return (
          <div key={String(k)} style={{ marginBottom: "12px" }}>
            <p style={{ marginBottom: "-3px" }}>
              {icons[k as string] || null} {String(k)} : {value ?? "—"}
            </p>
          </div>
        );
      })}
    </Center>
  );
};

export const FoodInfoView = ({ title, ingredients } : { title : string, ingredients: string }) => {
    return (
        <>
        <Center style={{fontSize:'18px'}}>
            <br/>
            <H3>{title}</H3>
            <br/>
            <p><span style={{color:'SpringGreen'}}><Info size='30'/></span> Ingredients: {ingredients}</p>
        </Center>
        </>
    )
}
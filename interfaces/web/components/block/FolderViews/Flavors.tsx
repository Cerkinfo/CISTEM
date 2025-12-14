import { Center, H3 } from "@styles/components/titles";
import { Eye, Mouth, Nose } from "@front/components/utils/icons";
import type { Database } from "@db";
import type { JSX } from "react";

type FlavorsRow = Database["public"]["Tables"]["beers_flavors"]["Row"];
type KeyOfFlavorsRow = keyof FlavorsRow;
export const FlavorsView = ({ flavor }: { flavor: FlavorsRow | null }) => {
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
      <H3>Flavors</H3>
      <br />
      {keys.filter(k => k !== "id").map((k) => {
        const raw = flavor[k];

        let value: string | undefined;

        if (raw === null || raw === undefined) value = undefined;
        else if (typeof raw === "string") value = raw;

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
import { Eye, Mouth, Nose } from "@front/components/utils/icons";
import type { Database } from "@db";
import type { JSX } from "react";
import { Center, H3 } from "@front/styles/components/titles";
import { useItem } from "@pkg/hooks/list/getItem";

type FlavorsRow = Database["public"]["Tables"]["beers_flavors"]["Row"];
type KeyOfFlavorsRow = keyof FlavorsRow;
export const FlavorsView = ({ beerId, flavors_ }: { beerId: number, flavors_?: any }) => {
  const { item: flavors, isLoading } = useItem({ tableName: "beers_flavors", key: beerId })
  if (isLoading) {
    return (
      <Center style={{ fontSize: "18px" }}>
        <H3>Flavors</H3>
        <p>Loading…</p>
      </Center>
    );
  }
  const keys = Object.keys(flavors || flavors_) as KeyOfFlavorsRow[];

  const icons: Record<string, JSX.Element> = {
    visual: <Eye size="30" />,
    smell: <Nose size="30" />,
    taste: <Mouth size="30" />,
  };

  if(!keys) return null;
  return (
    <>
      <H3>Flavors</H3>
      <br />
      {keys.filter(k => k !== "id").map((k) => {
        const raw = flavors ? flavors[k] : flavors_[k];

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
    </>
  );
};
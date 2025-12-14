import { Center, H3 } from "@styles/components/titles";
import { Progress } from "reactstrap";
import type { Database } from "@db";

type TasteRow = Database["public"]["Tables"]["beers_taste"]["Row"];
type KeyOfTasteRow = keyof TasteRow;
export const TasteView = ({ taste }: { taste: TasteRow | null }) => {
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
      <H3>Taste</H3>
      <br />
      {keys.filter(k => k !== "id").map((k) => {
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
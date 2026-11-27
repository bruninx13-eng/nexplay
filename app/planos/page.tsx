import { Conversion } from "@/components/Conversion";
import { Plans } from "@/components/Plans";

export const metadata = {
  title: "Planos",
  description: "Conheça os planos de entretenimento da NEXPLAY.",
};

export default function PlanosPage() {
  return (
    <main>
      <Plans />
      <Conversion />
    </main>
  );
}
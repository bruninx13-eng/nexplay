import { Conversion } from "@/components/Conversion";
import { FAQ } from "@/components/FAQ";

export const metadata = {
  title: "Contato",
  description: "Fale com a NEXPLAY pelo WhatsApp.",
};

export default function ContatoPage() {
  return (
    <main>
      <Conversion />
      <FAQ />
    </main>
  );
}
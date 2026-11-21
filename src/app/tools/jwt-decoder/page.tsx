import Container from "@/components/common/Container";
import JwtDecoder from "@/features/tools/jwt-decoder/JwtDecoder";
import ToolGuide from "@/components/tools/ToolGuide";
import { TOOL_GUIDES } from "@/constants/toolGuides";

export const metadata = {
  title: "JWT Decoder | Inspect JSON Web Token Header & Claims Locally",
  description:
    "Decode and inspect JWT headers, payload claims, and expiration timestamps 100% locally in your browser without sending tokens to a server.",
};

export default function JwtDecoderPage() {
  return (
    <Container>
      <JwtDecoder />
      <ToolGuide {...TOOL_GUIDES["jwt-decoder"]} />
    </Container>
  );
}
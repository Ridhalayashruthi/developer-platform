import Container from "@/components/common/Container";
import Base64Encoder from "@/features/tools/base64-encoder/Base64Encoder";
import ToolGuide from "@/components/tools/ToolGuide";
import { TOOL_GUIDES } from "@/constants/toolGuides";

export const metadata = {
  title: "Base64 Encoder & Decoder | UTF-8 Safe Online Base64 Converter",
  description:
    "Encode text to Base64 or decode Base64 strings back to UTF-8 locally in your browser with full Unicode and emoji support.",
};

export default function Base64EncoderPage() {
  return (
    <Container>
      <Base64Encoder />
      <ToolGuide {...TOOL_GUIDES["base64-encoder"]} />
    </Container>
  );
}
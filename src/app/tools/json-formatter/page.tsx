import Container from "@/components/common/Container";
import JsonFormatter from "@/features/tools/json-formatter/JsonFormatter";
import ToolGuide from "@/components/tools/ToolGuide";
import { TOOL_GUIDES } from "@/constants/toolGuides";

export const metadata = {
  title: "JSON Formatter & Validator | Free Online JSON Beautifier",
  description:
    "Format, validate, and minify JSON payloads 100% locally in your browser with zero server uploads.",
};

export default function JsonFormatterPage() {
  return (
    <Container>
      <JsonFormatter />
      <ToolGuide {...TOOL_GUIDES["json-formatter"]} />
    </Container>
  );
}
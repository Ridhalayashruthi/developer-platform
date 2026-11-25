import type { ReactNode } from "react";
import Container from "@/components/common/Container";
import OfflineTrustBadge from "@/components/tools/OfflineTrustBadge";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="pt-6">
        <Container>
          <div className="max-w-5xl mx-auto">
            <OfflineTrustBadge />
          </div>
        </Container>
      </div>
      {children}
    </>
  );
}
import { AwardsClient } from "@/components/modules/dashboard/admin/awards/AwardsClient";
import { awardService } from "@/services/award.service";
import { sessionService } from "@/services/session.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminAwardsPage() {
  const { data: sessionData } = await sessionService.getSession();

  if (!sessionData?.session) {
    redirect("/login");
  }

  const token = sessionData.session.token;
  const { data: awards } = await awardService.getAwards();

  return (
    <div className="space-y-6 min-h-screen">
      <AwardsClient
        awards={awards || []}
        token={token}
      />
    </div>
  );
}

import { sessionService } from "@/services/session.service";
import { ProfileClient } from "../../../../../components/modules/dashboard/profile/ProfileClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
    const { data: sessionData } = await sessionService.getSession();

    if (!sessionData?.session) {
        redirect("/login");
    }

    const userToken = sessionData.session.token;

    return <ProfileClient userToken={userToken} role="admin" />;
}

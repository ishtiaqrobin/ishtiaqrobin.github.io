import { sessionService } from "@/services/session.service";
import { UserProfileClient } from "./UserProfileClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function UserProfilePage() {
    const { data: sessionData } = await sessionService.getSession();

    if (!sessionData?.session) {
        redirect("/login");
    }

    const userToken = sessionData.session.token;

    return <UserProfileClient userToken={userToken} />;
}


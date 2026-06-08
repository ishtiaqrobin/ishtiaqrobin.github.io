import { sessionService } from "@/services/session.service";
import { ReviewManager } from "@/components/modules/dashboard/user/ReviewManager";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function UserReviewPage() {
    const { data: sessionData } = await sessionService.getSession();

    if (!sessionData?.session) {
        redirect("/login");
    }

    const userToken = sessionData.session.token;

    return (
        <div className="space-y-6 min-h-screen pb-20">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Manage Your Review</h1>
                <p className="text-muted-foreground mt-2">
                    Share your experience and help others learn more about my services
                </p>
            </div>

            <ReviewManager token={userToken} />
        </div>
    );
}

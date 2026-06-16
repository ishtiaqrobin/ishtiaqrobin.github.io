// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { env } from "@/env";
// import { revalidatePath, revalidateTag } from "next/cache";

// const API_URL = env.NEXT_PUBLIC_API_URL;

// export interface ActionResult {
//   success: boolean;
//   message: string;
//   data?: any;
// }

// // ── Create or Update (user) ───────────────────────────────────────────────────
// export async function createOrUpdateReviewAction(
//   data: { rating: number; comment?: string },
//   token: string,
//   existingReviewId?: string,
// ): Promise<ActionResult> {
//   try {
//     const url = existingReviewId
//       ? `${API_URL}/reviews/${existingReviewId}`
//       : `${API_URL}/reviews`;
//     const method = existingReviewId ? "PUT" : "POST";

//     const res = await fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await res.json();
//     if (result.success) {
//       revalidatePath("/");
//       revalidateTag("review", "max");
//       return {
//         success: true,
//         message: result.message || "Review submitted successfully",
//       };
//     }
//     return {
//       success: false,
//       message: result.message || "Failed to submit review",
//     };
//   } catch (error: any) {
//     return { success: false, message: error.message || "An error occurred" };
//   }
// }

// // ── Delete (user or admin) ────────────────────────────────────────────────────
// export async function deleteReviewAction(
//   id: string,
//   token: string,
// ): Promise<ActionResult> {
//   try {
//     const res = await fetch(`${API_URL}/reviews/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const result = await res.json();
//     if (result.success) {
//       revalidatePath("/");
//       revalidateTag("review", "max");
//       return {
//         success: true,
//         message: result.message || "Review deleted successfully",
//       };
//     }
//     return {
//       success: false,
//       message: result.message || "Failed to delete review",
//     };
//   } catch (error: any) {
//     return { success: false, message: error.message || "An error occurred" };
//   }
// }

// // ── Toggle Approve (admin) ────────────────────────────────────────────────────
// export async function approveReviewAction(
//   id: string,
//   token: string,
// ): Promise<ActionResult> {
//   try {
//     const res = await fetch(`${API_URL}/reviews/${id}/approve`, {
//       method: "PATCH",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const result = await res.json();
//     if (result.success) {
//       revalidatePath("/");
//       revalidateTag("review", "max");
//       return {
//         success: true,
//         message: result.message || "Review approval toggled",
//       };
//     }
//     return {
//       success: false,
//       message: result.message || "Failed to toggle approval",
//     };
//   } catch (error: any) {
//     return { success: false, message: error.message || "An error occurred" };
//   }
// }

// // ── Toggle Pin (admin) ────────────────────────────────────────────────────────
// export async function pinReviewAction(
//   id: string,
//   token: string,
// ): Promise<ActionResult> {
//   try {
//     const res = await fetch(`${API_URL}/reviews/${id}/pin`, {
//       method: "PATCH",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const result = await res.json();
//     if (result.success) {
//       revalidatePath("/");
//       revalidateTag("review", "max");
//       return { success: true, message: result.message || "Review pin toggled" };
//     }
//     return {
//       success: false,
//       message: result.message || "Failed to toggle pin",
//     };
//   } catch (error: any) {
//     return { success: false, message: error.message || "An error occurred" };
//   }
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { env } from "@/env";
import { revalidatePath, revalidateTag } from "next/cache";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

// ── Create or Update (user) ───────────────────────────────────────────────────
export async function createOrUpdateReviewAction(
  data: { position: string; companyName: string; comment: string },
  token: string,
  existingReviewId?: string,
): Promise<ActionResult> {
  try {
    const url = existingReviewId
      ? `${API_URL}/reviews/${existingReviewId}`
      : `${API_URL}/reviews`;
    const method = existingReviewId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/");
      revalidateTag("review", "max");
      return {
        success: true,
        message: result.message || "Review submitted successfully",
      };
    }
    return {
      success: false,
      message: result.message || "Failed to submit review",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

// ── Delete (user or admin) ────────────────────────────────────────────────────
export async function deleteReviewAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/reviews/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/");
      revalidateTag("review", "max");
      return {
        success: true,
        message: result.message || "Review deleted successfully",
      };
    }
    return {
      success: false,
      message: result.message || "Failed to delete review",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

// ── Toggle Approve (admin) ────────────────────────────────────────────────────
export async function approveReviewAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/reviews/${id}/approve`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/");
      revalidateTag("review", "max");
      return {
        success: true,
        message: result.message || "Review approval toggled",
      };
    }
    return {
      success: false,
      message: result.message || "Failed to toggle approval",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

// ── Toggle Pin (admin) ────────────────────────────────────────────────────────
export async function pinReviewAction(
  id: string,
  token: string,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/reviews/${id}/pin`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();
    if (result.success) {
      revalidatePath("/");
      revalidateTag("review", "max");
      return { success: true, message: result.message || "Review pin toggled" };
    }
    return {
      success: false,
      message: result.message || "Failed to toggle pin",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
}

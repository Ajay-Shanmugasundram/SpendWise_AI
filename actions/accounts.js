"use server";

// import aj from "@/lib/arcjet";
import { db } from "@/lib/prisma";
// import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

export async function updateDefaultAccount(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Get request data for ArcJet
    // const req = await request();

    // Check rate limit
    // const decision = await aj.protect(req, {
    //   userId,
    //   requested: 1, // Specify how many tokens to consume
    // });

    // if (decision.isDenied()) {
    //   if (decision.reason.isRateLimit()) {
    //     const { remaining, reset } = decision.reason;
    //     console.error({
    //       code: "RATE_LIMIT_EXCEEDED",
    //       details: {
    //         remaining,
    //         resetInSeconds: reset,
    //       },
    //     });

    //     throw new Error("Too many requests. Please try again later.");
    //   }

    //   throw new Error("Request blocked");
    // }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    const account = await db.account.update({
      where: { userId: user.id, id: accountId },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    return { success: true, error: error.message };
  }
}

export async function getAccountTransactions(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Get request data for ArcJet
    // const req = await request();

    // Check rate limit
    // const decision = await aj.protect(req, {
    //   userId,
    //   requested: 1, // Specify how many tokens to consume
    // });

    // if (decision.isDenied()) {
    //   if (decision.reason.isRateLimit()) {
    //     const { remaining, reset } = decision.reason;
    //     console.error({
    //       code: "RATE_LIMIT_EXCEEDED",
    //       details: {
    //         remaining,
    //         resetInSeconds: reset,
    //       },
    //     });

    //     throw new Error("Too many requests. Please try again later.");
    //   }

    //   throw new Error("Request blocked");
    // }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const accouunt = await db.account.findUnique({
      where: { clerkUserId: userId, id: accountId },
      include: {
        transaaction: {
          
        }
      }
    });
  } catch (error) {}
}

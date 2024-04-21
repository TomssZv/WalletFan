import prisma from "@/common/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const balance = await prisma.balance.findFirst({
    where: {
      id: 1
    },
    select: {
      balance: true
    }
  })

  if (!balance) {
    return NextResponse.json({}, {status: 500, statusText: "Balance not found!"})
  }

  return NextResponse.json(balance?.balance);
}


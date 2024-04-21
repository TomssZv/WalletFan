import prisma from "@/common/utils/prisma"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const balance = await prisma.balance.create({
    data: {
      balance: 0
    }
  })

  return NextResponse.json({}, {status: 200, statusText: "Balance succesfully set!"});
}
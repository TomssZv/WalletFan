import prisma from "@/common/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const group = await prisma.transactionGroup.findMany()

  if (!group) {
    return NextResponse.json({}, {status: 500, statusText: "Groups not found!"})
  }

  return NextResponse.json(group);
}


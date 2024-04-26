import prisma from "@/common/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json()
  const { name } = data;

  const group = await prisma.transactionGroup.create({
    data: {
      name: name
    }
  })

  return NextResponse.json(group);
}
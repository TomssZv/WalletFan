import prisma from "@/common/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const transactions = await prisma.$queryRaw`
    select concat(YEAR(createdAt), "-", MONTHNAME(createdAt), "-", transaction.id) as id, sum(amount) as amount, MONTHNAME(createdAt) as month, createdAt from transaction
    group by MONTHNAME(createdAt)`

  if (!transactions) {
    return NextResponse.json({}, {status: 500, statusText: "Transactions not found!"})
  }

  return NextResponse.json(transactions);
}


import prisma from "@/common/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const transactions = await prisma.$queryRaw`
    select concat(YEAR(createdAt), "-", MONTHNAME(createdAt), "-", gr.name) as id, sum(amount) as ammount, MONTHNAME(createdAt) as month, createdAt, gr.name as groupName from transaction
    inner join transactionGroup as gr on gr.id = transaction.groupId
    group by MONTHNAME(createdAt), gr.id;`

  if (!transactions) {
    return NextResponse.json({}, {status: 500, statusText: "Transactions not found!"})
  }

  return NextResponse.json(transactions);
}


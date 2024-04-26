import prisma from "@/common/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const transactions = await prisma.$queryRaw`
    select concat(YEAR(createdAt), "-", MONTHNAME(createdAt), "-", transaction.id) as rowId, sum(amount) as ammount, MONTHNAME(createdAt) as month, createdAt, cat.name as categoryName, cat.id as categoryId, gr.name as groupName, gr.id as groupId from transaction
    inner join category as cat on cat.id = transaction.categoryId
    left join transactionGroup as gr on gr.id = transaction.groupId
    group by MONTHNAME(createdAt)`

  if (!transactions) {
    return NextResponse.json({}, {status: 500, statusText: "Transactions not found!"})
  }

  return NextResponse.json(transactions);
}


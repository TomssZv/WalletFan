import prisma from "@/common/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { year: string, month: string } }) {
  const { year, month } = params;
  console.log(params)
  const transactions = await prisma.$queryRaw`
    select *, cat.name as categoryName, cat.id as categoryId, gr.name as groupName, gr.id as groupId from transaction
    inner join category as cat on cat.id = transaction.categoryId
    left join transactionGroup as gr on gr.id = transaction.groupId
    where MONTHNAME(createdAt) = ${month} and YEAR(createdAt) = ${year};`

  if (!transactions) {
    return NextResponse.json({}, {status: 500, statusText: "Transactions not found!"})
  }

  return NextResponse.json(transactions);
}


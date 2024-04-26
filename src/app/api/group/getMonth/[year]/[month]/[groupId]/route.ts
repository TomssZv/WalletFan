import prisma from "@/common/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { year: string, month: string, groupId: string } }) {
  const { year, month, groupId } = params;
  console.log(params)
  const transactions = await prisma.$queryRaw`
  select transaction.*, createdAt, gr.name as groupName, gr.id as groupId from transaction
  inner join transactionGroup as gr on gr.id = transaction.groupId and gr.id = ${groupId}
  where MONTHNAME(createdAt) = ${month} and YEAR(createdAt) = ${year};`
  

  if (!transactions) {
    return NextResponse.json({}, {status: 500, statusText: "Transactions not found!"})
  }

  return NextResponse.json(transactions);
}


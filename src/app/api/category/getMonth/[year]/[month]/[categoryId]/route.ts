import prisma from "@/common/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { year: string, month: string, categoryId: string } }) {
  const { year, month, categoryId } = params;

  const transactionIds: {id: number}[] = await prisma.$queryRaw`
    SELECT transaction.id FROM transaction
    WHERE MONTHNAME(createdAt) = ${month} and YEAR(createdAt) = ${year} and transaction.categoryId = ${categoryId} ORDER BY transaction.createdAt DESC`

  const transactions = await prisma.transaction.findMany({
    where: {
      id: {
        in: transactionIds.map(transaction => transaction.id)
      }
    },
    include: {
      category: true
    }
  })

  if (!transactions) {
    return NextResponse.json({}, {status: 500, statusText: "Transactions not found!"})
  }

  return NextResponse.json(transactions);
}
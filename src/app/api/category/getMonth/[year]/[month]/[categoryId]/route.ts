import prisma from "@/common/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { year: string, month: string, categoryId: string } }) {
  const { year, month, categoryId } = params;
  console.log(params)
  const transactions = await prisma.$queryRaw`
    select transaction.*, cat.name as categoryName, createdAt, cat.id as categoryId from transaction
    inner join category as cat on cat.id = transaction.categoryId and cat.id = ${categoryId}
    where MONTHNAME(createdAt) = ${month} and YEAR(createdAt) = ${year}`

  if (!transactions) {
    return NextResponse.json({}, {status: 500, statusText: "Transactions not found!"})
  }

  return NextResponse.json(transactions);
}


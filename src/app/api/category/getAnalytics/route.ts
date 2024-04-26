import prisma from "@/common/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const transactions = await prisma.$queryRaw`
    select concat(YEAR(createdAt), "-", MONTHNAME(createdAt), "-", cat.name) as id, sum(amount) as ammount, MONTHNAME(createdAt) as month, cat.name as categoryName, createdAt from transaction
    inner join category as cat on cat.id = transaction.categoryId
    group by MONTHNAME(createdAt), cat.id;`

  if (!transactions) {
    return NextResponse.json({}, {status: 500, statusText: "Transactions not found!"})
  }

  return NextResponse.json(transactions);
}


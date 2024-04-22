import prisma from "@/common/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {
    var data = await request.json();

    var {
      page = null,
      pageLimit = null,
      descOrder = false,
    } = data
  } catch {
    
  }

  if (!data) {
    const transactions = await prisma.transaction.findMany({
      include: {
        category: true
      }
     })
  
     return NextResponse.json(transactions)
  }

  if (!pageLimit) {
    return NextResponse.json({}, {status: 500, statusText: "Pagination data not provided"})
  }

  const skipAmount = page && page === 1 ? 0 : page * pageLimit;
  const order = descOrder ? "desc" : "asc";

  const transactions = await prisma.transaction.findMany({
    orderBy: {
      createdAt: order,
    },
    include: {
      category: true
    },
    skip: skipAmount,
    take: pageLimit
  })

  return NextResponse.json(transactions)
}
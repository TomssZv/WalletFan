import prisma from "@/common/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
   const transactions = await prisma.transaction.findMany({
    include: {
      category: true
    }
   })

   return NextResponse.json(transactions)
}
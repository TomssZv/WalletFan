import prisma from "@/common/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json()
  const {
    transactionId
  } = data;

  const deletedTransaction = await prisma.transaction.delete({
    where: {
      id: transactionId
    }
  })

  const oldBalance = await prisma.balance.findFirst({
    where: {
      id: 1
    }
  })

  if (!oldBalance) {
    return NextResponse.json({}, {status: 500})
  }

  const newBalance = deletedTransaction.deducted ? oldBalance.balance + deletedTransaction.amount : oldBalance.balance - deletedTransaction.amount;

  const balance = await prisma.balance.update({
    where: {
      id: 1
    },
    data: {
      balance: newBalance,
    },
  })

  if (!balance) {
    return NextResponse.json({}, {status: 500})
  }

  return NextResponse.json(balance);
}
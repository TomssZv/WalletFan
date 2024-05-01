import prisma from "@/common/utils/prisma";
import { connect } from "http2";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json()
  const {
    deducted,
    amount,
    categoryId,
    comment,
    groupId = null
  } = data;

  const balanceResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/balance/get`);
  const oldBalance = await balanceResponse.json()

  if (balanceResponse.status !== 200) {
    return NextResponse.json({}, {status: 500, statusText: "Something went wrong"});
  }

  const newBalance = deducted ? parseFloat(oldBalance) - parseFloat(amount) : parseFloat(oldBalance) + parseFloat(amount);

  const transaction = await prisma.transaction.create({
    data: {
      amount: deducted ? -amount : +amount,
      deducted: deducted,
      isLongTerm: false,
      comment: comment,
      category: { 
        connect: {
          id: categoryId
        }
      },
      group: {
        connect: groupId ? {id: groupId} : undefined
      }
    }
  })

  const balance = await prisma.balance.update({
    where: {
      id: 1
    },
    data: {
      balance: newBalance,
    },
  })

  balance

  const transactionObject = await prisma.transaction.findFirst({
    where: {
      id: transaction.id
    },
    include: {
      category: true
    }
  })

  if (!transactionObject) {
    return NextResponse.json({}, {status: 500, statusText: "Something went wrong"})
  }

  return NextResponse.json(transactionObject);
}
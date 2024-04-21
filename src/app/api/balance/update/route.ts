import prisma from "@/common/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json()
  const {deducted, amount} = data;

  const balanceResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/balance/get`);
  const oldBalance = await balanceResponse.json()

  if (!oldBalance) {
    return;
  }

  const newBalance = deducted ? parseFloat(oldBalance) - parseFloat(amount) : parseFloat(oldBalance) + parseFloat(amount);

  const balance = await prisma.balance.update({
    where: {
      id: 1
    },
    data: {
      balance: newBalance,
    },
  })

  return NextResponse.json(balance);
}
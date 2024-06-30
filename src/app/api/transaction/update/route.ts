import prisma from '@/common/utils/prisma';
import formatDate from '@/helpers/formatDate/formatDate';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const { transactionId, attribute, value } = data;

  const transaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
    },
  });

  if (!transaction) {
    return NextResponse.json(
      {},
      { status: 500, statusText: 'There is no transaction with this id' }
    );
  }

  const updatedData = { [attribute]: value };

  const updateTransaction = await prisma.transaction.update({
    data: updatedData,
    where: {
      id: transactionId,
    },
  });

  if (!updateTransaction) {
    return NextResponse.json(
      {},
      { status: 500, statusText: 'Something went wrong' }
    );
  }

  return NextResponse.json(updateTransaction);
}

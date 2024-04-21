import prisma from "@/common/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const categories = await prisma.category.findMany()

  if (!categories) {
    return NextResponse.json({}, {status: 500, statusText: "Categories not found!"})
  }

  return NextResponse.json(categories);
}


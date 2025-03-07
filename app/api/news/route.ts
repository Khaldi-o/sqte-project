import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uint8ArrayToBase64 } from "@/lib/utils";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const safePage = Math.max(1, page);
    const safePageSize = Math.max(1, Math.min(pageSize, 10));

    const skip = (safePage - 1) * safePageSize;

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        take: safePageSize,
        skip: skip,
        orderBy: { createdAt: "desc" }, // Sort by latest
      }),
      prisma.news.count(),
    ]);

    // Convert image buffer to base64 if needed
    const newsWithImage = news.map((item) => ({
      ...item,
      image: item.image ? uint8ArrayToBase64(item.image) : null,
    }));

    return NextResponse.json({
      news: newsWithImage,
      page: safePage,
      pageSize: safePageSize,
      total,
      totalPages: Math.ceil(total / safePageSize),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

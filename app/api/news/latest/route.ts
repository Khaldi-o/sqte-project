import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { uint8ArrayToBase64 } from '@/lib/utils';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const latestNews = await prisma.news.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!latestNews) {
      return NextResponse.json({ error: 'No news found' }, { status: 404 });
    }

    const eventWithImage = latestNews.image
      ? {
          ...latestNews,
          image: uint8ArrayToBase64(latestNews.image),
        }
      : latestNews;

    return NextResponse.json(eventWithImage);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch latest news' }, { status: 500 });
  }
}
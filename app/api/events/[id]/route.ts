import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET({ params }: { params: { id: string } }) {
  try {
    const newsItem = await prisma.news.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!newsItem) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }
    return NextResponse.json(newsItem);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function PUT({ params, request }: { params: { id: string }; request: Request }) {
  try {
    const { title, content, image } = await request.json();
    const updatedNews = await prisma.news.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        title,
        content,
        image: image || null,
      },
    });
    return NextResponse.json(updatedNews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    await prisma.news.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({ message: 'News deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
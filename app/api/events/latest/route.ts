import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { uint8ArrayToBase64 } from '@/lib/utils';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const latestEvent = await prisma.event.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!latestEvent) {
      return NextResponse.json({ error: 'No events found' }, { status: 404 });
    }

    const eventWithImage = latestEvent.image
      ? {
          ...latestEvent,
          image: uint8ArrayToBase64(latestEvent.image),
        }
      : latestEvent;

    return NextResponse.json(eventWithImage);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch latest event' }, { status: 500 });
  }
}
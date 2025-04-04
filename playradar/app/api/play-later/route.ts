import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { id, gameId } = await req.json();

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        play_later: { push: [gameId] },
      },
    });
    return NextResponse.json({ success: true, user });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error storing play later game' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { play_later: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, play_later: user.play_later });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error fetching play later games' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id, gameId } = await req.json();

    // First get current user to access existing game in play_later
    const currentUser = await prisma.user.findUnique({
      where: { id: id },
      select: { play_later: true },
    });

    // Filter out the gameId we want to remove
    const updatedPlayLater =
      currentUser?.play_later.filter((id) => id !== gameId) || [];

    const user = await prisma.user.update({
      where: { id: id },
      data: {
        play_later: updatedPlayLater,
      },
    });
    return NextResponse.json({ success: true, user });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error removing game from play later' },
      { status: 500 },
    );
  }
}

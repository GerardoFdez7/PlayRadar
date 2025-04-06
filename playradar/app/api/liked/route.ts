import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/connections/prisma';

export async function POST(req: NextRequest) {
  try {
    const { id, gameId } = await req.json();

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        liked: { push: [gameId] },
      },
    });
    return NextResponse.json({ success: true, user });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error storing likes' },
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
      select: { liked: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, liked: user.liked });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error fetching dislikes' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id, gameId } = await req.json();

    // First get current user to access existing likes
    const currentUser = await prisma.user.findUnique({
      where: { id: id },
      select: { liked: true },
    });

    // Filter out the gameId we want to remove
    const updatedLiked = currentUser?.liked.filter((id) => id !== gameId) || [];

    const user = await prisma.user.update({
      where: { id: id },
      data: {
        liked: updatedLiked,
      },
    });
    return NextResponse.json({ success: true, user });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error removing like' },
      { status: 500 },
    );
  }
}

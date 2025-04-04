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
        disliked: { push: [gameId] },
      },
    });
    return NextResponse.json({ success: true, user });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error storing dislikes' },
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
      select: { disliked: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, disliked: user.disliked });
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

    // First get current user to access existing dislikes
    const currentUser = await prisma.user.findUnique({
      where: { id: id },
      select: { disliked: true },
    });

    // Filter out the gameId we want to remove
    const updatedDisliked =
      currentUser?.disliked.filter((id) => id !== gameId) || [];

    const user = await prisma.user.update({
      where: { id: id },
      data: {
        disliked: updatedDisliked,
      },
    });
    return NextResponse.json({ success: true, user });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error removing dislike' },
      { status: 500 },
    );
  }
}

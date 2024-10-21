/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const json = await req.json();
  const { email } = json;

  try {
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    const user = await prisma.user.create({
      data: {
        email,
      },
    });

    return NextResponse.json({
      user,
      message: 'User subscribed successfully',
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (
        error.message.includes(
          'Unique constraint failed on the fields: (`email`)'
        )
      ) {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

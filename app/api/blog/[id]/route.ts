import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // For a completely static site, we just return blog data
  // No tracking of views
  return NextResponse.json({ success: true });
}
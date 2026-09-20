import { NextRequest, NextResponse } from 'next/server';
import { cacheTag, cacheLife, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';
import { verifyToken } from '@/lib/auth';

// Cached data-fetching function — defined OUTSIDE route handlers
async function getSettingsFromDB() {
  'use cache';
  cacheTag('settings');
  cacheLife('hours');

  await connectDB();
  let settings = await SiteSettings.findOne().lean();

  if (!settings) {
    const created = await SiteSettings.create({ blogsVisible: false });
    return {
      blogsVisible: Boolean(created.blogsVisible),
    };
  }

  return {
    blogsVisible: Boolean(settings.blogsVisible),
  };
}

// GET /api/settings — public, cached
export async function GET() {
  try {
    const settings = await getSettingsFromDB();
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PATCH /api/settings — protected (JWT), updates site settings & invalidates cache
export async function PATCH(request: NextRequest) {
  const authError = verifyToken(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { blogsVisible } = body;

    if (typeof blogsVisible !== 'boolean') {
      return NextResponse.json(
        { error: 'blogsVisible must be a boolean' },
        { status: 400 }
      );
    }

    await connectDB();
    const updated = await SiteSettings.findOneAndUpdate(
      {},
      { $set: { blogsVisible } },
      { upsert: true, new: true, lean: true }
    );

    // Invalidate the 'settings' cache tag
    revalidateTag('settings', 'max');

    return NextResponse.json(
      { blogsVisible: Boolean(updated.blogsVisible) },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

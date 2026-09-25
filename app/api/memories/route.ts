import { NextRequest, NextResponse } from 'next/server';
import { cacheTag, cacheLife, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import Memory from '@/models/Memory';
import cloudinary from '@/lib/cloudinary';
import { verifyToken } from '@/lib/auth';

// Cached data-fetching function — defined OUTSIDE route handlers
async function getMemoriesFromDB() {
  'use cache';
  cacheTag('memories');
  cacheLife('minutes');

  await connectDB();
  const memories = await Memory.find().sort({ createdAt: 1 }).lean();
  return JSON.parse(JSON.stringify(memories));
}

// GET /api/memories — fetch all memories, older first and newest last (cached)
export async function GET() {
  try {
    const memories = await getMemoriesFromDB();
    return NextResponse.json(memories, { status: 200 });
  } catch (error) {
    console.error('Error fetching memories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch memories' },
      { status: 500 }
    );
  }
}

// POST /api/memories — upload a new memory photo (protected)
export async function POST(request: NextRequest) {
  // Verify JWT token
  const authError = verifyToken(request);
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { error: 'An image file is required' },
        { status: 400 }
      );
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary under portfolio/memories
    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'portfolio/memories' },
          (error, result) => {
            if (error || !result) {
              reject(error ?? new Error('Cloudinary upload failed'));
            } else {
              resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
              });
            }
          }
        );
        uploadStream.end(buffer);
      }
    );

    await connectDB();

    const newMemory = new Memory({
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      createdAt: new Date(),
    });

    const savedMemory = await newMemory.save();
    revalidateTag('memories', 'max');

    return NextResponse.json(savedMemory, { status: 201 });
  } catch (error) {
    console.error('Error adding memory:', error);
    return NextResponse.json(
      { error: 'Server error while uploading memory' },
      { status: 500 }
    );
  }
}

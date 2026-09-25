import { NextRequest, NextResponse } from 'next/server';
import { cacheTag, cacheLife, revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';
import cloudinary from '@/lib/cloudinary';
import { verifyToken } from '@/lib/auth';

// Cached data-fetching function — defined OUTSIDE route handlers
async function getBlogsFromDB() {
  'use cache';
  cacheTag('blogs');
  cacheLife('minutes');

  await connectDB();
  const blogs = await Blog.find().sort({ _id: -1 }).lean();
  return JSON.parse(JSON.stringify(blogs));
}

// GET /api/blogs — fetch all blogs, newest first (cached)
export async function GET() {
  try {
    const blogs = await getBlogsFromDB();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST /api/blogs — add a new blog post (protected, with image upload)
export async function POST(request: NextRequest) {
  // Verify JWT token
  const authError = verifyToken(request);
  if (authError) return authError;

  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    let imageUrl = '';
    let publicId = '';

    // Upload image to Cloudinary if provided
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'portfolio/blogs' },
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

      imageUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }

    await connectDB();

    const newBlog = new Blog({
      title,
      description,
      imageUrl,
      publicId,
    });

    const savedBlog = await newBlog.save();
    revalidateTag('blogs', 'max');
    return NextResponse.json(savedBlog, { status: 201 });

  } catch (error) {
    console.error('Error adding blog:', error);
    return NextResponse.json(
      { error: 'Server error while uploading blog' },
      { status: 500 }
    );
  }
}

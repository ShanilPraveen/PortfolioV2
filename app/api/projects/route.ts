import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Project from '@/models/Project';
import cloudinary from '@/lib/cloudinary';
import { verifyToken } from '@/lib/auth';

// GET /api/projects — fetch all projects, newest first
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ _id: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects — add a new project (protected, with image upload)
export async function POST(request: NextRequest) {
  // Verify JWT token
  const authError = verifyToken(request);
  if (authError) return authError;

  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const githubUrl = formData.get('githubUrl') as string;
    const techStackRaw = formData.get('techStack') as string;
    const imageFile = formData.get('image') as File | null;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Parse tech stack from comma-separated string
    const techStack = techStackRaw
      ? techStackRaw.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    let imageUrl = '';

    // Upload image to Cloudinary if provided
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      imageUrl = await new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'portfolio' },
          (error, result) => {
            if (error || !result) {
              reject(error ?? new Error('Cloudinary upload failed'));
            } else {
              resolve(result.secure_url);
            }
          }
        );
        uploadStream.end(buffer);
      });
    }

    await connectDB();

    const newProject = new Project({
      title,
      description,
      imageUrl,
      githubUrl,
      techStack,
    });

    const savedProject = await newProject.save();
    return NextResponse.json(savedProject, { status: 201 });

  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json(
      { error: 'Server error while uploading project' },
      { status: 500 }
    );
  }
}

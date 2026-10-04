import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sanitizeString, validateEmail, escapeHtml } from '@/lib/validation';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// POST /api/contact — send a contact email via Gmail SMTP
export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 messages per 10 minutes per IP
    const clientIp = getClientIp(request);
    const { success } = rateLimit(`contact:${clientIp}`, 10, 10 * 60 * 1000);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many messages. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    const name = sanitizeString(body?.name, 100);
    const email = sanitizeString(body?.email, 254);
    const subject = sanitizeString(body?.subject, 200).replace(/[\r\n]+/g, ' ');
    const message = sanitizeString(body?.message, 5000);

    // Validate all fields are present
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, subject, message) are required' },
        { status: 400 }
      );
    }

    // Validate email format and header injection prevention
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create Gmail SMTP transporter using app password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content with HTML escaping for all user inputs
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedSubject = escapeHtml(subject);
    const escapedMessageHtml = escapeHtml(message).replace(/\n/g, '<br>');

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            New Message from Portfolio
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #333; width: 100px;">Name:</td>
              <td style="padding: 10px 0; color: #555;">${escapedName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 10px 0; color: #555;">
                <a href="mailto:${escapedEmail}" style="color: #6366f1;">${escapedEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #333;">Subject:</td>
              <td style="padding: 10px 0; color: #555;">${escapedSubject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="font-weight: bold; color: #333; margin-bottom: 8px;">Message:</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; color: #555; line-height: 1.6;">
              ${escapedMessageHtml}
            </div>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}

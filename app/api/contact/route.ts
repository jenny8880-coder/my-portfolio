import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message, to } = body;

    // Validate required fields
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Use Resend API to send email
    // You'll need to set RESEND_API_KEY in your environment variables
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      // For development: log the email details
      console.log('Email would be sent to:', to || 'jenny8880@gmail.com');
      console.log('Subject: Contact from Portfolio');
      console.log('Body:', {
        firstName,
        lastName,
        email,
        phone: phone || 'Not provided',
        message
      });
      
      // Return success for development (set up Resend API key for production)
      return NextResponse.json(
        { message: 'Email sent successfully (development mode)' },
        { status: 200 }
      );
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>', // Update with your verified domain
        to: to || 'jenny8880@gmail.com',
        reply_to: email,
        subject: 'Contact from Portfolio',
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>First Name:</strong> ${firstName}</p>
          <p><strong>Last Name:</strong> ${lastName || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        text: `
New Contact Form Submission

First Name: ${firstName}
Last Name: ${lastName || 'Not provided'}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend API error:', error);
      throw new Error(error.message || 'Failed to send email');
    }

    const data = await response.json();
    return NextResponse.json(
      { message: 'Email sent successfully', id: data.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

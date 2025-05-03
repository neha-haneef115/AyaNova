import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    console.log('Received form data:', { name, email, subject });
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Your email from .env file
      subject: `Contact Form: ${subject}`,
      text: `From: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #0891b2;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
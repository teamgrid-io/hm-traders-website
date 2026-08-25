import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    let { name, email, phone, message } = body;

    // 🔒 Trim inputs
    name = name?.trim();
    email = email?.trim();
    phone = phone?.trim();
    message = message?.trim();

    // ✅ Validation rules
    const errors = {};

    // Name validation
    if (!name || name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      errors.name = "Name should contain only letters";
    }

    // Email validation
    if (!email) {
      errors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      errors.email = "Invalid email format";
    }

    // Phone validation (India: 10 digits)
    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      errors.phone = "Invalid phone number";
    }

    // Message validation
    if (!message ) {
      errors.message = "Message is required";
    }

    // 🚨 If any error → return
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // ✅ Detect type
    const isNewsletter = message.includes("Newsletter");

    // ✅ Transporter (use env in real project)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "sakilhossain.com@gmail.com",
        pass: "tsmtcxfjkihhbdph",
      },
    });

    await transporter.verify();

    // ✅ Send mail
    await transporter.sendMail({
      from: `"Website Contact" <sakilhossain.com@gmail.com>`,
      to: "sakilhossain.com@gmail.com",
      replyTo: email,
      subject: isNewsletter
        ? "📩 Newsletter Subscription"
        : "📨 New Contact Form Submission",
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("❌ Email Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send email",
      },
      { status: 500 }
    );
  }
}
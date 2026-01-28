import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter;

// Configure email service
if (process.env.EMAIL_SERVICE === "gmail") {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
} else if (process.env.SENDGRID_API_KEY) {
  transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });
} else {
  // Development mode: no email sending
  transporter = {
    sendMail: async (options) => {
      console.log("[DEV MODE] Email would be sent:", {
        to: options.to,
        subject: options.subject,
      });
      return { messageId: "dev-mode-" + Date.now() };
    },
  };
}

// Send contact form email to admin
export const sendContactEmail = async (data) => {
  const { name, email, company, message } = data;

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_RECIPIENT,
      subject: `New Portfolio Contact: ${name} from ${company || "N/A"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
      `,
      replyTo: email,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Send confirmation email to user
export const sendConfirmationEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "We Received Your Message",
      html: `
        <h2>Thank You, ${escapeHtml(name)}!</h2>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to check out our portfolio and services.</p>
        <br>
        <p>Best regards,<br>Full-Stack Developer Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    // Don't throw - confirmation email failure shouldn't block submission
    return false;
  }
};

// Helper function to escape HTML
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export default transporter;

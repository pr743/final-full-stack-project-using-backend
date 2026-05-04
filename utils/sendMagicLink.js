import axios from "axios";

const sendMagicLink = async (email, link) => {
    try {
        const res = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Portfolio Auth",
                    email: "princemungra1340@gmail.com",
                },
                to: [{ email }],
                subject: "Login to your account",
                htmlContent: `
          <div style="font-family: Arial; padding: 20px;">
            <h2>Login to your account</h2>
            <p>Click the button below to login:</p>
            
            <a href="${link}" 
              style="display:inline-block;padding:10px 20px;
              background:#4f46e5;color:#fff;text-decoration:none;
              border-radius:5px;">
              Login Now
            </a>

            <p style="margin-top:20px;">
              This link will expire in 10 minutes.
            </p>
          </div>
        `,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Email sent 🚀", res.data);

    } catch (error) {
        console.error(
            "Brevo Error:",
            error.response?.data || error.message
        );
        throw new Error("Email sending failed");
    }
};

export default sendMagicLink;
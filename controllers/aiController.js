import axios from "axios";

export const chatAI = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }


        const systemPrompt = `
You are an AI assistant representing a MERN stack developer portfolio.

You are the developer. Answer in FIRST PERSON.

Projects:

1. Multi-tenant MERN SaaS App
- Real-time updates
- Multi-user system
- Scalable backend architecture
- Performance optimized

2. Movie App (MERN)
- Real-time movie API integration
- YouTube trailer integration
- Cloudinary image uploads
- Dynamic UI with auto-changing banner

3. E-commerce Backend
- Authentication system
- Order management
- Secure REST APIs

4. Starbucks Clone
- Pixel-perfect UI
- Fully responsive design
- Clean frontend architecture

5. Quiz App
- Interactive quiz system
- Score tracking
- Dynamic questions rendering
- Instant feedback to users


6. Blog App 
- Create, read, update, delete blogs
- Like & comment system
- User authentication
- Clean UI for reading blogs

Rules:
- Answer ONLY based on these projects
- Keep answers SHORT and clear
- Speak like "I built...", "I implemented..."
- Do NOT give generic ChatGPT answers
`;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );


        console.log("AI RAW:", response.data);

        res.json({
            reply: response.data.choices[0].message.content
        });

    } catch (error) {
        console.log("AI ERROR:", error.response?.data || error.message);

        res.status(500).json({
            message: "AI error"
        });
    }
};
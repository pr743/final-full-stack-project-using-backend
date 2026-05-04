import Contact from "../models/Contact.js";


export const sendContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newContact = await Contact.create({
            name,
            email,
            message
        });

        res.status(201).json({
            message: "Message saved successfully ✅",
            data: newContact
        })

    } catch (error) {
        console.log("CONTACT ERROR:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
}
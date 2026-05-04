import Token from "../models/Token.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendMagicLink from "../utils/sendMagicLink.js";



export const sendMagicLinkHandler = async (req, res) => {
    try {
        const { email } = req.body;

        const token = crypto.randomBytes(32).toString("hex");

        const link = `${process.env.SERVER_URL}/api/auth/verify?token=${token}`;


        await Token.deleteMany({ email });

        await Token.create({
            email,
            token,
            expiresAt: Date.now() + 10 * 60 * 1000
        });

        await sendMagicLink(email, link);

        res.status(200).json({ message: "Magic link sent" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};



export const verifyMagicLink = async (req, res) => {
    try {
        const { token } = req.query;

        const record = await Token.findOne({ token });

        if (!record || record.expiresAt < Date.now()) {
            return res.redirect(`${process.env.CLIENT_URL}/login?error=expired`);
        }

        let user = await User.findOne({ email: record.email });

        if (!user) {
            user = await User.create({ email: record.email });
        }

        const jwtToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );


        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        await Token.deleteOne({ token });

        return res.redirect(`${process.env.CLIENT_URL}/auth/verify-success`);

    } catch (error) {
        console.log(error);
        return res.redirect(`${process.env.CLIENT_URL}/login?error=server`);
    }
};



export const getMe = async (req, res) => {
    try {
        res.status(200).json({
            message: "User authenticated",
            user: req.user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });

        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
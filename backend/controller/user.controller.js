import User from '../model/user.model.js';
import bcryptjs from 'bcryptjs';


// Signup
export const singup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "User already exists" });

        const hashPassword = await bcryptjs.hash(password, 10);

        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword
        });
        await createdUser.save();

        res.status(201).json({
            message: "User created successfully", user: {
                id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ message: "Invalid email or password" });

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email
            }
        });

        // Send OTP after login
        // sendOtp(user);

    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

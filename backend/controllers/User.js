const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.SignUp = async (req, res) => {
    try {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\S]{8,}$/;//+
        const { name, email, password , role } = req.body;
        // Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character." });
        }
      
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword , role });
        const savedUser = await newUser.save();

        res.status(201).json({ 
            message: "User registered successfully", 
            user: { id: savedUser._id, name: savedUser.name, email: savedUser.email , role: savedUser.role} 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Sign-in successful", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

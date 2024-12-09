const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.SignUp = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Request Files:", req.files);

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\S]{8,}$/;

        const profile_img = Array.isArray(req.files?.profile_img)
          ? req.files.profile_img.map((file) => file.filename)
          : req.files?.profile_img?.filename || "";

        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !profile_img) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role, profile_img });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.access_key, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 3600000) });

        return res.json({
            message: "User created successfully",
            user: {
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role,
            },
            token: token
        });
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ message: "Failed to create user", error: err.message });
    }
};


exports.SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
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
            return res.status(401).json({ message: "Invalid Password" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.access_key);
        // Set the cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 3*24*60*60*1000
        });

        // Return response with user details and token
        return res.json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: token,
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "An error occurred during login", error: err.message });
    }
};


exports.Loggout = (req, res) => {
    try {
        // Clear the JWT cookie
        res.cookie('jwt', '', { httpOnly: true, secure: true, expires: new Date(0) });

        // Send a success response
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);

        // Handle server error
        return res.status(500).json({ message: "Logout failed", error: error.message });
    }
};

exports.getuser = async (req, res) => {
    try {
        
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

exports.getall = async (req,res) =>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    
    }
}
exports.me = async(req, res)=>{
    if (!req.user) {
        return res.json({ message: "Unauthorizing Baby" });
    }else{
    return res.json(req.user);
    }
}
exports.admin = async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admin role required' });
    }
    // Respond with user details or confirmation message
    res.json({ message: 'Welcome, Admin!', user: req.user });
  };
  
  
exports.delete = async (req, res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
}


exports.update = async (req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error updating user", error: error.message });
    }

}
import jwt from "jsonwebtoken";


export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Generate a JWT token for admin
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ success: true,message: "Login successful", token });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
};

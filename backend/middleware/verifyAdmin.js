import jwt from "jsonwebtoken";

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });
    next();
  });
};

export {verifyAdmin};

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access Denied",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    const decoded = jwt.verify(token, "mysecretkey");

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;
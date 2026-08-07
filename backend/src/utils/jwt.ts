import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

export const generateToken = (userId: number) => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
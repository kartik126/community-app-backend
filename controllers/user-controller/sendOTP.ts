import { Request, Response } from "express";
import User from "../../models/user";
import { z } from "zod";

let requestBodySchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

let sendOTP = async (req: Request, res: Response) => {
  try {
    let requestBody = requestBodySchema.parse(req.body);

    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully on ${
        requestBody.phone || requestBody.email
      }`,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default sendOTP;

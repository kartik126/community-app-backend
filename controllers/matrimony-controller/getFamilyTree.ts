import { Request, Response } from "express";
import User from "../../models/user";

let getFamilyTree = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user?._id;

    const user = await User.findById(userId).populate("family_tree");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      family_tree: user.family_tree
    });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getFamilyTree;


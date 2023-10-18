import { Request, Response } from "express";
import User from "../../models/user";
import FamilyTree from "../../models/familyTree";

let deleteFamilyTree = async (req: Request, res: Response) => {
  try {
    const familyTreeId = req.params.familyTreeId;
    const userId = req.body.user?._id;

    const user = await User.findById(userId);

    if (user) {
      user.family_tree =
        user.family_tree?.filter((id) => id.toString() !== familyTreeId) || [];
      await user.save();
      await FamilyTree.findByIdAndRemove(familyTreeId);
      return res
        .status(200)
        .json({ message: "Family tree entry deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default deleteFamilyTree;

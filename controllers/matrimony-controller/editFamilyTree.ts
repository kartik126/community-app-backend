import { Request, Response } from "express";
import { z } from "zod";
import User from "../../models/user";
import FamilyTree from "../../models/familyTree";
import uploadImageToCloudinary from "../../helpers/uploadImage";

let requestBodySchema = z.object({
  fullname: z.string(),
});

let editFamilyTree = async (req: Request, res: Response) => {
  try {
    const familyTreeId = req.params.familyTreeId;
    let requestBody = requestBodySchema.parse(req.body);
    const userId = req.body.user?._id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const familyTree = await FamilyTree.findById(familyTreeId);

    if (!familyTree) {
      return res.status(404).json({ message: "Family tree entry not found" });
    }

    const imageBuffer: any = req.file?.buffer;

    user.family_tree =
      user.family_tree?.filter((id) => id.toString() !== familyTreeId) || [];

    if (requestBody.fullname) {
      familyTree.full_name = requestBody.fullname;
    }
    if (imageBuffer) {
      const cloudinaryFolderName = "your-folder-name";
      const imageUrl = await uploadImageToCloudinary(
        imageBuffer,
        cloudinaryFolderName
      );
      familyTree.image = imageUrl;
    }
    await familyTree.save();
    return res.status(200).json({
      message: "Family tree entry updated successfully",
      familyTree,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default editFamilyTree;

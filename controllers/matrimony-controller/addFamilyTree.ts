import { Request, Response } from "express";
import { z } from "zod";
import User from "../../models/user";
import uploadImageToCloudinary from "../../helpers/uploadImage";
import FamilyTree from "../../models/familyTree";

let requestBodySchema = z.object({
  fullname: z.string(),
});

let addFamilyTree = async (req: Request, res: Response) => {
  try {
    let requestBody = requestBodySchema.parse(req.body);
    const userId = req.body.user?._id;

    let user = await User.findById(userId);

    const imageBuffer: any = req.file?.buffer;

    if (!imageBuffer) {
      return res
        .status(404)
        .json({ message: "please provide an profile image" });
    }

    const cloudinaryFolderName = "your-folder-name";
    const imageUrl = await uploadImageToCloudinary(
      imageBuffer,
      cloudinaryFolderName
    );

    const newFamilyTree = new FamilyTree({
      full_name: requestBody.fullname,
      image: imageUrl,
    });

    await newFamilyTree.save();

    user?.family_tree.push(newFamilyTree._id);

    await user?.save();

    const populatedUser = await User.findById(userId).populate("family_tree");

    return res
      .status(200)
      .json({
        message: "Family tree added successfully",
        family_tree: populatedUser,
      });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default addFamilyTree;

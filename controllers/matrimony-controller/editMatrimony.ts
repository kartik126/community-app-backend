import { Request, Response } from "express";
import Matrimony from "../../models/matrimony";
import { z } from "zod";
import uploadImageToCloudinary from "../../helpers/uploadImage";

const editMatrimony = async (req: Request, res: Response) => {
  try {
    const matrimonyId = req.params.id;

    const matrimonyUser: any = await Matrimony.findById(matrimonyId);

    if (!matrimonyUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let requestBodySchema = z.object({
      fullname: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      gender: z.string().optional(),
      dob: z.string().optional(),
      birth_time: z.string().optional(),
      birth_place: z.string().optional(),
      height: z.string().optional(),
      bloodgroup: z.string().optional(),
      highest_education: z.string().optional(),
      village_name: z.string().optional(),
      nadi: z.string().optional(),
      gana: z.string().optional(),
      complexion: z.string().optional(),
      spectacles: z.string().optional(),
      manglik: z.string().optional(),
      weight: z.string().optional(),
      hobbies: z.string().optional(),
      address: z.string().optional(),
      family_details: z
        .object({
          father_name: z.string().optional(),
          occupation: z.string().optional(),
          annual_income: z.string().optional(),
          phone: z.string().optional(),
          sister_marriage_status: z.string().optional(),
          brother_marriage_status: z.string().optional(),
          family_type: z.string().optional(),
        })
        .optional(),
      proffessional_details: z
        .object({
          occupation: z.string().optional(),
          industry: z.string().optional(),
          annual_income: z.string().optional(),
        })
        .optional(),
      // Add more fields as needed
    });

    let requestBody = requestBodySchema.parse(req.body);

    if (requestBody.fullname) {
      matrimonyUser.fullname = requestBody.fullname;
    }
    if (requestBody.email) {
      matrimonyUser.email = requestBody.email;
    }
    if (requestBody.phone) {
      matrimonyUser.phone = requestBody.phone;
    }
    if (requestBody.gender) {
      matrimonyUser.gender = requestBody.gender;
    }
    if (requestBody.dob) {
      matrimonyUser.dob = requestBody.dob;
    }
    if (requestBody.birth_time) {
      matrimonyUser.birth_time = requestBody.birth_time;
    }
    if (requestBody.birth_place) {
      matrimonyUser.birth_place = requestBody.birth_place;
    }
    if (requestBody.height) {
      matrimonyUser.height = requestBody.height;
    }
    if (requestBody.bloodgroup) {
      matrimonyUser.bloodgroup = requestBody.bloodgroup;
    }
    if (requestBody.highest_education) {
      matrimonyUser.highest_education = requestBody.highest_education;
    }
    if (requestBody.village_name) {
      matrimonyUser.village_name = requestBody.village_name;
    }
    if (requestBody.nadi) {
      matrimonyUser.nadi = requestBody.nadi;
    }
    if (requestBody.gana) {
      matrimonyUser.gana = requestBody.gana;
    }
    if (requestBody.complexion) {
      matrimonyUser.complexion = requestBody.complexion;
    }
    if (requestBody.spectacles) {
      matrimonyUser.spectacles = requestBody.spectacles;
    }
    if (requestBody.manglik) {
      matrimonyUser.manglik = requestBody.manglik;
    }
    if (requestBody.weight) {
      matrimonyUser.weight = requestBody.weight;
    }
    if (requestBody.hobbies) {
      matrimonyUser.hobbies = requestBody.hobbies;
    }
    if (requestBody.address) {
      matrimonyUser.address = requestBody.address;
    }

    // family details checks
    if (requestBody.family_details) {
      if (requestBody.family_details.father_name) {
        matrimonyUser.family_details.father_name =
          requestBody.family_details.father_name;
      }
      if (requestBody.family_details.occupation) {
        matrimonyUser.family_details.occupation =
          requestBody.family_details.occupation;
      }
      if (requestBody.family_details.annual_income) {
        matrimonyUser.family_details.annual_income =
          requestBody.family_details.annual_income;
      }
      if (requestBody.family_details.phone) {
        matrimonyUser.family_details.phone = requestBody.family_details.phone;
      }
      if (requestBody.family_details.sister_marriage_status) {
        matrimonyUser.family_details.sister_marriage_status =
          requestBody.family_details.sister_marriage_status;
      }
      if (requestBody.family_details.brother_marriage_status) {
        matrimonyUser.family_details.brother_marriage_status =
          requestBody.family_details.brother_marriage_status;
      }
      if (requestBody.family_details.family_type) {
        matrimonyUser.family_details.family_type =
          requestBody.family_details.family_type;
      }
    }

    // proffesional details checks

    if (requestBody.proffessional_details) {
      if (requestBody.proffessional_details.occupation) {
        matrimonyUser.proffessional_details.occupation =
          requestBody.proffessional_details.occupation;
      }
      if (requestBody.proffessional_details.industry) {
        matrimonyUser.proffessional_details.industry =
          requestBody.proffessional_details.industry;
      }
      if (requestBody.proffessional_details.annual_income) {
        matrimonyUser.proffessional_details.annual_income =
          requestBody.proffessional_details.annual_income;
      }
    }

    const imageBuffer: any = req.file?.buffer;
    const cloudinaryFolderName = "your-folder-name";

    const imageUrl = await uploadImageToCloudinary(
      imageBuffer,
      cloudinaryFolderName
    );

    if (imageUrl) {
      matrimonyUser.profile_image = imageUrl;
    }

    console.log(
      "OUTPUT++++++++++++++++++++++++++++++++++++++++++++++++>",
      requestBody
    );

    await matrimonyUser.save();

    res
      .status(200)
      .json({ message: "Matrimony User updated successfully", matrimonyUser });
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default editMatrimony;

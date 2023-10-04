import { Request, Response } from "express";
import { z } from "zod";
import Matrimony from "../models/matrimony";
import { sign } from "jsonwebtoken";
import User from "../models/user";

let requestBodySchema = z.object({
  fullname: z.string(),
  email: z.string(),
  phone: z.string(),
  gender: z.string(),
  dob: z.string(),
  birth_time: z.string(),
  birth_place: z.string(),
  height: z.string(),
  bloodgroup: z.string(),
  highest_education: z.string(),
  village_name: z.string(),
  nadi: z.string(),
  gana: z.string(),
  complexion: z.string(),
  spectacles: z.string(),
  manglik: z.string(),
  weight: z.string(),
  hobbies: z.string(),
  address: z.string(),
});

let addMatrimony = async (req: Request, res: Response) => {
  try {
    console.log("result=======================>", req.body);

    let requestBody = requestBodySchema.parse(req.body);

    const familyDetails = {
      father_name: req.body["family_details[father_name]"],
      occupation: req.body["family_details[occupation]"],
      annual_income: req.body["family_details[annual_income]"],
      phone: req.body["family_details[phone]"],
      sister_marriage_status:
        req.body["family_details[sister_marriage_status]"],
      brother_marriage_status:
        req.body["family_details[brother_marriage_status]"],
      family_type: req.body["family_details[family_type]"],
    };

    const professionalDetails = {
      occupation: req.body["proffessional_details[occupation]"],
      industry: req.body["proffessional_details[industry]"],
      annual_income: req.body["proffessional_details[annual_income]"],
    };

    // Check if the email or phone already exists
    const existingUser = await Matrimony.findOne({
      $or: [{ email: requestBody.email }, { phone: requestBody.phone }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already exists" });
    }

    let matrimonyUser = new Matrimony({
      fullname: requestBody.fullname,
      email: requestBody.email,
      phone: requestBody.phone,
      gender: requestBody.gender,
      dob: requestBody.dob,
      birth_time: requestBody.birth_time,
      birth_place: requestBody.birth_place,
      height: requestBody.height,
      bloodgroup: requestBody.bloodgroup,
      highest_education: requestBody.highest_education,
      village_name: requestBody.village_name,
      nadi: requestBody.nadi,
      gana: requestBody.gana,
      complexion: requestBody.complexion,
      spectacles: requestBody.spectacles,
      manglik: requestBody.manglik,
      weight: requestBody.weight,
      hobbies: requestBody.hobbies,
      address: requestBody.address,
      family_details: familyDetails,
      proffessional_details: professionalDetails,
    });

    await matrimonyUser.save();

    res.status(200).send({
      message: "Matrimony profile created successfully",
      user: matrimonyUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default addMatrimony;

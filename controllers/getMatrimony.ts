import { Request, Response } from "express";
import Matrimony from "../models/matrimony";
import { z } from "zod";

const requestBodySchema = z.object({
  minAge: z.string().optional(),
  maxAge: z.string().optional(),
  minHeight: z.string().optional(),
  maxHeight: z.string().optional(),
  minWeight: z.string().optional(),
  maxWeight: z.string().optional(),
  minIncome: z.string().optional(),
  maxIncome: z.string().optional(),
  manglik: z.string().optional(),
  complexion: z.string().optional(),
  education: z.string().optional(),
  location: z.string().optional(),
});

const getMatrimony = async (req: Request, res: Response) => {
  try {
    const {
      minAge,
      maxAge,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      minIncome,
      maxIncome,
      manglik,
      complexion,
      education,
      location,
    } = requestBodySchema.parse(req.body);

    const filter: any = {};

    if (minAge !== undefined && maxAge !== undefined) {
      filter.age = { $gte: minAge, $lte: maxAge };
    }

    if (minHeight !== undefined && maxHeight !== undefined) {
      filter.height = { $gte: minHeight, $lte: maxHeight };
    }

    if (minWeight !== undefined && maxWeight !== undefined) {
      filter.weight = { $gte: minWeight, $lte: maxWeight };
    }

    if (minIncome !== undefined && maxIncome !== undefined) {
      filter.annualIncome = { $gte: minIncome, $lte: maxIncome };
    }
    if (manglik !== undefined) {
      filter.manglik = manglik;
    }
    if (complexion !== undefined) {
      filter.complexion = complexion;
    }
    if (education !== undefined) {
      filter.education = education;
    }
    if (location !== undefined) {
      filter.location = location;
    }

    console.log("request body =================>", minWeight, maxWeight);

    const matrimonyUser = await (Object.keys(filter).length === 0
      ? Matrimony.find({})
      : Matrimony.find(filter));

    if (!matrimonyUser || matrimonyUser.length === 0) {
      return res.status(404).json({ message: "Not Found" });
    }

    res.status(200).send({ message: "success", data: matrimonyUser });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getMatrimony;

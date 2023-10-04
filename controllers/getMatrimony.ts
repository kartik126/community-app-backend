import { Request, Response } from "express";
import Matrimony from "../models/matrimony";

const getMatrimony = async (req: Request,res: Response) => {
  try {
    const matrimonyUser = await Matrimony.find({});

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

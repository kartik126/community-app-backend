import mongoose, { Schema } from "mongoose";

let matrimonySchema = new Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    required: true,
    unique: true,
    type: String,
    minlength: 10,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 10,
  },
  dob: {
    required: true,
    type: String,
  },
  gender: {
    required: true,
    type: String,
  },
  complexion: {
    required: true,
    type: String,
  },
  bloodgroup: {
    required: true,
    type: String,
  },
  spectacles: {
    required: true,
    type: String,
  },
  manglik: {
    required: true,
    type: String,
  },
  height: {
    required: true,
    type: String,
  },
  weight: {
    required: true,
    type: String,
  },
  education: {
    required: true,
    type: String,
  },
  hobbies: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  family_details: {
    father_name: {
      required: true,
      type: String,
    },
    occupation: {
      required: true,
      type: String,
    },
    annual_income: {
      type: String,
    },
    phone: {
      required: true,
      type: String,
      maxlength: 20,
    },
    sister_marriage_status: {
      type: String,
    },
    brother_marriage_status: {
      type: String,
    },
    family_type: {
      required: true,
      type: String, //joint family or nuclear family
    },
  },

  proffessional_details: {
    occupation: {
      required: true,
      type: String,
    },
    industry: {
      required: true,
      type: String,
    },
    annual_income: {
      required: true,
      type: String,
    },
  },

  partner_preferences: {
    required: true,
    type: String,
  },
});


let Matrimony = mongoose.model('Matrimony',matrimonySchema);

export default Matrimony;
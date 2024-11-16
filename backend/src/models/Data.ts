import { Schema, model, Document, Mongoose,Types } from "mongoose";


const dataSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    country: { type: String,required : true },
  });
  

const Data = model("Data", dataSchema);

export default Data;

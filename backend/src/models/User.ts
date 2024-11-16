import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  username : string;
  email : string;
  password : string;
  country : string;
  role : "admin" | "viewer" | "superadmin"
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true  },
  country: { type: String, required: true },
  role : {type : String, enum: ["admin" , "viewer" , "superadmin"], required: true},
});


const User = model("User", userSchema);

export default User;

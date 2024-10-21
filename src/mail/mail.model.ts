import { model, Schema } from "mongoose";
import { IEmail_Record } from "./mail.interface";

const  EmailRecordSchema =new Schema <IEmail_Record>({

      Name: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    }, { timestamps: true });

    export const EmailRecord = model<IEmail_Record>("EmailRecord", EmailRecordSchema);

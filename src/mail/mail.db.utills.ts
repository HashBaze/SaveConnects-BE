

import { EmailRecord } from "./mail.model"; 
import { IEmail_Record,IEmail } from "./mail.interface"; 


export async function saveEmailRecord(emailData: IEmail_Record): Promise<void> {
  try {
    const newEmailRecord = new EmailRecord(emailData);
    await newEmailRecord.save();
    console.log("Email record saved successfully.");
  } catch (error) {
    console.error("Error saving email record:", error);
    throw new Error("Failed to save email record");
  }
}


export async function findAllEmailRecords(): Promise<IEmail_Record[]> {
    try {
      const records = await EmailRecord.find(); // Fetch all records from the EmailRecord collection
      return records; // Return the list of records
    } catch (error) {
      console.error("Error fetching email records:", error);
      throw new Error("Failed to fetch email records");
    }
}

//Delete all

export async function deleteALL():Promise<void>{
  try{
    await EmailRecord.deleteMany({});
    console.log("Deleted all recods")    
  }
  catch(error){
    console.error("Error deleting email",error)
  }
}

// Score emails
export async function predict(inputData: IEmail) {
  try {
    const response = await fetch(`${process.env.MODEL_URL}`+"/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    if (!response.ok) {
      throw new Error("Failed to get prediction");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null
  }
}

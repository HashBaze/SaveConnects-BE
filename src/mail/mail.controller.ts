import { Request, Response } from "express";
import { inquiryEmail } from "../mail/mail.send";
import { IEmail,IEmail_Record } from "./mail.interface";
import { saveEmailRecord ,findAllEmailRecords,deleteALL} from "./mail.db.utills";

export const sendMail = async (req: Request, res: Response) => {
  const { name, from, to, message } = req.body;
  try {
    await inquiryEmail(from, to, name, message);
    const email_client: IEmail = {
      Name: name,
      body: message,
      email:from
    };
    const predictionOutput = await predict(email_client);
    if (!predictionOutput) {
      console.log("Prediction output is not available.");
    } else {
      console.log(`Name: ${predictionOutput.Name}`);
      console.log(`FinalScore: ${predictionOutput.FinalScore}`);

      const emailRecord: IEmail_Record = {
        Name: name,
        body: message,
        email:from,
        score: predictionOutput.FinalScore
      };
     
      await saveEmailRecord(emailRecord); 
      // await logDeleteAll(); 
      await logAllEmailRecords();  
      const rank_users = await rankUsers();  
      console.log(rank_users); 
    }      

    return res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

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

export async function logAllEmailRecords() {
  try {
    const allEmails = await findAllEmailRecords(); 
    console.log(allEmails); 
  } catch (error) {
    console.error("Error fetching email records:", error); 
  }
}

export async function logDeleteAll(){
  try{
    await deleteALL();    
  }catch (error){
    console.error("Error will be :",error)
  }
}

//Rank users
export async function rankUsers(){
  try{
      const users = await findAllEmailRecords();
      if (!users || users.length ===0){
        return{
          statusCode:404,
          message :"No users foound"
        };        
      }else{
        const rank_users = users.sort((a,b)=>b.score-a.score)
        const rankScore =  rank_users.map(user=>({
          Name:user.Name,
          Score:user.score,
          Email:user.email
        }));
        return rankScore
      }    
  }catch(error){
    console.error("Error is",error)
  }
}

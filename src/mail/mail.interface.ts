export interface IEmail {
    Name: string;
    body: string;
    email:string
  }

export interface IEmail_Record extends IEmail {
    score: number; 
}
import {Request,Response} from "express"
import { validationResult } from "express-validator";
import { loginServices, signupServices } from "../services/auth.services";


export const signUpController = async (req: Request, res: Response) :Promise<any>=> {
  const errors = validationResult(req);

  const { username, password, role } = req.body;

 const signupResponse= await signupServices(errors,username,password,role,)
  res.status(signupResponse.code).json({message:signupResponse.message,user:signupResponse.user})
};

 export const loginController = async (req: Request, res: Response) :Promise<any>=> {
  const { username, password } = req.body;

  const loginResponse = await loginServices(username,password)
  res.status(loginResponse.code).json({message:loginResponse.message,token:loginResponse.token})
  
};


// import { Request, Response } from "express";
// import { validationResult } from "express-validator";
// import { loginServices, signupServices } from "../services/auth.services";

// export const signUpController = async (req: Request, res: Response): Promise<void> => {
//     const errors = validationResult(req);
//     const { username, password, role } = req.body;

//     const signupResponse = await signupServices(errors, username, password, role);
//     if (!signupResponse || !signupResponse.code) {
//         res.status(500).json({ message: "Internal Server Error" });
//         return;
//     }

//     res.status(signupResponse.code).json({ message: signupResponse.message, user: signupResponse.user });
// };

// export const loginController = async (req: Request, res: Response): Promise<void> => {
//     const { username, password } = req.body;

//     const loginResponse = await loginServices(username, password);
//     if (!loginResponse || !loginResponse.code) {
//         res.status(500).json({ message: "Internal Server Error" });
//         return;
//     }

//     res.status(loginResponse.code).json({ message: loginResponse.message, token: loginResponse.token });
// };
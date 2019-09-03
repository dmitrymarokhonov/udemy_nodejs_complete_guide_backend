import checkAPIs from "express-validator";
import filterAPIs from "express-validator";

const { check, validationResult } = checkAPIs;
const { matchedData } = filterAPIs;
import User from "../models/user"


export const signup = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error("Validation failed.")
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
}
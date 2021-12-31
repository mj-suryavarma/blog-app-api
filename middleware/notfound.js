import { StatusCodes } from "http-status-codes";

const NotFound = (req,res,next) => {

    res.status(200).send("Router does not exist");

    next();
}

export default NotFound;

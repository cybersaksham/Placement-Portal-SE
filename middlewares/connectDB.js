import dbConnect from "../lib/db";

export default async function connectToDB(req, res, next) {
    try {
        await dbConnect();
        next();
    }
    catch (e) {
        return res.status(500).json({
            error: "Database Error",
            message: e.message
        });
    }
}
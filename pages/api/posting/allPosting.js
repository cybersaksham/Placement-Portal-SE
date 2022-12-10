import { modelTypes } from "../../../lib/types";
import { connectToDB } from "../../../middlewares";
import router from "../../../lib/router";

export default router
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { type } = req.query;
            let data = await modelTypes[type].find()
                .populate({
                    path: "posting",
                    populate: { path: "company", select: "-password" }
                }).lean();
            data.company = data.posting.company;
            delete data.posting.company;
            return res.json(data);
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    })
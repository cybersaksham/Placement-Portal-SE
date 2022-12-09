import { modelTypes } from "../../../lib/types";
import { connectToDB } from "../../../middlewares";
import router from "../../../lib/router";

export default router
    .all(connectToDB)
    .get(async (req, res) => {
        try {
            const { type } = req.query;
            modelTypes[type].find()
                .populate({
                    path: "posting",
                    populate: { path: "company", select: "-password" }
                })
                .exec((err, posts) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Unknown Error",
                            message: err.message
                        });
                    }
                    else return res.send(posts);
                });
        } catch (e) {
            return res.status(500).json({
                error: "Internal Server Error",
                message: e.message
            });
        }
    })
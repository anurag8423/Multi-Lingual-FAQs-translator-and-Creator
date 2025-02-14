import { redisClient } from "../services/cache.js";

const checkCache = async (req, res, next) => {
    try {
        const lang = req.query.lang || "en";

        const cachedData = await redisClient.get(`faqs:${lang}`);
        
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        next();
    } catch (err) {
        next();
    }
};

export { checkCache };

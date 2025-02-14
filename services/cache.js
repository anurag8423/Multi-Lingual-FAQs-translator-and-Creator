import Redis from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "redis", // 'redis' for Docker, 'localhost' otherwise
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (error) => {
  console.error("Redis error:", error);
});

export { redisClient };

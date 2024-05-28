import * as redis from 'redis';
import 'dotenv/config';

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`
});

redisClient.on('error', (err: Error) => console.log('Redis Client Error', err));

const createRedisConnection = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.log('Error connecting to Redis', err);
  }
}

export {
  redisClient,
  createRedisConnection
};

import * as redis from 'redis';

const redisClient = redis.createClient(); // on port 6379

redisClient.on('error', (err: Error) => console.log('Redis Client Error', err));

const createRedisConnection = async () => {
  await redisClient.connect();
  console.log("conneted to redis");
} 

export {
  redisClient,
  createRedisConnection
};
import Redis from 'ioredis'

const redis = () => {
    const redis = new Redis(process.env.REDIS_URL || '')

    redis.on('error', (err) => {
        console.error({ op: 'redisError', err: err })
        throw new Error('Unable to connect to Redis host: ' + err.host)
    })

    return redis
}

export default redis()
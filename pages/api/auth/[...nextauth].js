import NextAuth from "next-auth"
//import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github"
// import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter"
// import upstashRedisClient from "@upstash/redis"

// const redis = upstashRedisClient(
//     process.env.UPSTASH_REDIS_REST_URL,
//     process.env.UPSTASH_REDIS_REST_TOKEN
// )

export default NextAuth({
  //adapter: UpstashRedisAdapter(redis),
  // Configure one or more authentication providers
  providers: [
    // EmailProvider({
    //     server: process.env.EMAIL_SERVER,
    //     from: process.env.EMAIL_FROM
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
})
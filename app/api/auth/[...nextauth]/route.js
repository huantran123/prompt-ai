import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
// user
import User from '@models/user'

// tutorial for next-auth: https://next-auth.js.org/getting-started/example

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    // session function
    async session({ session }) {
      // get the user that matches the current user in the the session
      const sessionUser = await User.findOne({
        email: session.user.email
      })

      // assign id of current user in the session with the _id of user found and return session
      session.user.id = sessionUser._id.toString()
      return session
    },
    // signin function
    async signIn({ profile }) {
      try {
        // only connect to db dynamically when signIn function is called
        await connectToDB()

        // check if a user already exists
        const userExists = await User.findOne({
          email: profile.email
        })

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          })
        }

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }
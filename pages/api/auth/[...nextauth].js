import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          // Register or login the user in your backend
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`,
            {
              name: user.name,
              email: user.email,
              googleId: profile.sub,
              image: user.image
            }
          )
          user.backendToken = res.data.user.token
          user.isAdmin = res.data.user.isAdmin
          user._id = res.data.user._id
          return true
        } catch (err) {
          console.error('Google signin error:', err)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.backendToken = user.backendToken
        token.isAdmin = user.isAdmin
        token._id = user._id
      }
      return token
    },
    async session({ session, token }) {
      session.backendToken = token.backendToken
      session.user.isAdmin = token.isAdmin
      session.user._id = token._id
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})
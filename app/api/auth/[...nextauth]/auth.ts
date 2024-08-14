import envConfig from "@/config";
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from "next/headers";

export const authOptions:any = {
  providers: [
    GoogleProvider({
      clientId: envConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: envConfig.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ account }:{account:any}) {
      cookies().set("IdTokenSocial", account.id_token);
    },
}
};
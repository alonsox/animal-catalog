export const securityConfig = {
  /** The secret for hashing the users' sessions */
  authSecret: process.env.AUTH_SECRET as string,
};

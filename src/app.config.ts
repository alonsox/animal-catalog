export const appConfig = {
  /** The port on which the server will listen */
  port: parseInt(process.env.PORT || '3000', 10),

  /** The URL where the app is located */
  urlApp: process.env.APP_URL as string,
};

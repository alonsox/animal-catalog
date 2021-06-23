export const configuracionApp = {
  port: parseInt(process.env.PORT || '3000', 10),
  urlApp: process.env.APP_URL as string,
};

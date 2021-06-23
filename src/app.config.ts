interface AppConfig {
  port: number;
}

export const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
}
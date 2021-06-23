import 'dotenv/config';
import { app } from './app';
import { appConfig } from './app.config';

app.listen(appConfig.port, () => {
  console.log(`Server running at http://www.localhost:${appConfig.port}`);
});

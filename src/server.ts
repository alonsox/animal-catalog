import 'dotenv/config';
import { app } from './app';
import { appConfig } from './app.config';
import { connectDB } from './db';

/*
 * CONNECT DATABASE
 */
connectDB();

/*
 * START SERVER
 */
app.listen(appConfig.port, () => {
  console.log(`Server running at ${appConfig.appUrl}`);
});

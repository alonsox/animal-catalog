import 'dotenv/config';
import { app } from './app';
import { configuracionApp } from './app.config';

app.listen(configuracionApp.port, () => {
  console.log(
    `Server running at http://www.localhost:${configuracionApp.port}`,
  );
});

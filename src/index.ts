import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 8080
mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => {
    app.listen(PORT);
    console.log(`Server is running in PORT ${PORT} and DB is connected`);
  })
  .catch((e) => console.log(e));

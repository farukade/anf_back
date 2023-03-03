import mongoose from 'mongoose';


const dbConnection = (url: string) => {
  const connArr = url.split(":");
  const connString = connArr[2].split("@").splice(1).join(":");

  mongoose.set('strictQuery', false);
  mongoose.connect(url)
    .then(() => {
      console.log('Mongo Database Connected!');
      console.log(connArr.splice(0, 2).join(":") + ":******@" + connString);
    })
    .catch((e) => console.error(e));
}

export default dbConnection;
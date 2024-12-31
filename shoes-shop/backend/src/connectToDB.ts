const mongoose = require('mongoose');

const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME

// en local
const uri = `${dbHost}://${dbUser}:${dbPassword}@localhost:27017/${dbName}`;

// dans docker
// const uri = `${dbHost}://${dbUser}:${dbPassword}@${dbHost}:27017/${dbName}?authSource=admin`;


const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connexion à MongoDB réussie !');
  } catch (error: any) {
    console.error('Erreur de connexion à MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;

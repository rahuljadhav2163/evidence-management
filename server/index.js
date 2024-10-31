import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import PoliceStation from "./models/PoliceStation.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const MongoDBConn = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected');
    } catch (e) {
        console.log(`Error: ${e.message}`);
        process.exit(1); 
    }
};
MongoDBConn();

app.get('/', (req, res) => {
    res.send('server is running')
});

app.post('/api/registerPoliceStation', async (req, res) => {
    try {
      const { stationName, stationCode, jurisdictionArea, contactNumber, email, address, city, state, inChargeName, emergencyContact,password } = req.body;
      const newStation = new PoliceStation({
        stationName,
        stationCode,
        jurisdictionArea,
        contactNumber,
        email,
        address,
        city,
        state,
        inChargeName,
        emergencyContact,
        password
      });
      
      const savedStation = await newStation.save();
      res.status(201).json({ message: 'Police station registered successfully', data: savedStation });
    } catch (error) {
      res.status(500).json({ message: 'Error registering police station', error: error.message });
    }
  });

  // Post api

  app.post('/api/loginStation', async (req, res) => {
    const { email, password } = req.body;
    const findUser = await PoliceStation.findOne({ password, email }).select('stationName contactNumber inChargeName ')

    if (findUser == null) {
        return res.json({
            success: "false",
            message: "Something went wrong..!"
        }
        )
    }
    res.json({
        success: "true",
        data: findUser,
        message: "Login successfully..!"
    }
    )
})



const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});
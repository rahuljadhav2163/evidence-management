import mongoose from "mongoose";

const policeStationSchema = new mongoose.Schema({
  stationName: {
    type: String,
    required: true,
  },
  stationCode: {
    type: String,
    unique: true,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  inChargeName: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
 { timestamps: true });

const PoliceStation = mongoose.model('PoliceStation', policeStationSchema);

export default PoliceStation;

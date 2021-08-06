const mongoose = require("mongoose");
const random = require("abazunts-mongoose-random");
const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
      pathName: {
        type: Buffer,
        required: true,
      },
      pathType: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

StoreSchema.plugin(random);
module.exports = Store = mongoose.model("Store", StoreSchema);

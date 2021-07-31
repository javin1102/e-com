const mongoose = require("mongoose");
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
StoreSchema.virtual("imagePath").get(function () {
  if (this.pathName != null && this.pathTyhpe != null) {
    return `data:${this.pathType};charset=utf-8;base64,${this.pathName.toString(
      "base64"
    )}`;
  }
});

module.exports = Store = mongoose.model("Store", StoreSchema);

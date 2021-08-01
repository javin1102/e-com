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
  console.log("a");
  if (this.products.pathName !== null && this.products.pathType !== null) {
    return `data:${
      this.products.pathType
    };charset=utf-8;base64,${this.products.pathName.toString("base64")}`;
  }
});

module.exports = Store = mongoose.model("Store", StoreSchema);

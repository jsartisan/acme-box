const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: String,
    isFile: Boolean,
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Item"
    },
    ancestors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = {
  Schema: itemSchema,
  options: {}
};

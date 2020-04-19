const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  rating: Number,
  selectedRate: String,
  id: Number,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
  }
});

// ratingSchema.set('toObject', {
//   transform: function(doc, ret, options) {
//     let returnJson = {
//       _id: ret._id,
//       rating: ret.rating
//     }
//     return returnJson
//   }
// })

module.exports = mongoose.model('Rating', ratingSchema);
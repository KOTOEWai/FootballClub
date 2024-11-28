const mongoose = require('mongoose');
let profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
let profile_imgs_collections_list = ["notionists-neutral", "adventurer-neutral", "fun-emoji"];

const User = new mongoose.Schema({
       name: {type: String, required: true},
       email: {type: String, required: true, unique: true},
       role: {
              type: String,
              enum: ["admin", "coach", "player", "staff", "fan"],
              default: "fan",
            },
       password: {type: String, required: true},

       profile_img: {
              type: [String],
              default: () => {
                  return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
              } 
          },
})

module.exports = mongoose.model('User', User);
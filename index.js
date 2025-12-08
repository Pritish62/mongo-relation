const mongoose = require('mongoose');
const {Schema} = mongoose;

main().then(() => {
    console.log("data base is connected")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationshipclass');
}


//one to few
const userSchema = new Schema({
    username: String,
    address: [
        {
            location: String,
            city: String,
        }
    ]
})

const User = mongoose.model("User", userSchema)

const addUsers = async() => {const user1 = new User({
    username: "sherlock homles",
    address:[
        {
            location: "piplani",
            city: "bhopal"
        },{
            location: "lalganj",
            city: "delhi"
        }
    ]
})
let user = await user1.save();
console.log(user);

}

addUsers();




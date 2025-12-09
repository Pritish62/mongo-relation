const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(() => {
  console.log("data base is connected")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationshipclass');
}

const userSchema = new Schema({
  username: String,
  email: String,
})

const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

const User = mongoose.model("User", userSchema)
const Post = mongoose.model("Post", postSchema)

const addData = async() => {
    let user = await User.findOne({username:"pritishkumar"})
    let post2 = new Post ({
        content: "this is my second post",
        likes: 1265,
    })
    post2.user = user;

await post2.save()

}

// getData();

const getData = async() =>{ 
    let res = await Post.findOne({}).populate("user");
    console.log(res)
}

getData();
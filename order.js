const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(() => {
  console.log("data base is connected")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationshipclass');
}

const orderSchema = new Schema({
  item: String,
  price: Number,
})

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
})

const Order = mongoose.model("Order", orderSchema)
const Customer = mongoose.model("Customer", customerSchema)

const addCustomer = async () => {
  const cust1 = new Customer({
    name: "pritish"
  })

  const order1 = await Order.findOne({ item: "Somsa" })
  const order2 = await Order.findOne({ item: "Chai" })

  cust1.orders.push(order1)
  cust1.orders.push(order2)

  const res = await cust1.save()
  console.log(res)
}

addCustomer();


// const addOrder = async () => {
//     let res = await Order.insertMany([
//         {item:"Somsa", price: 12},
//         {item: "Chips",price: 20},
//         {item: "Chai",price: 10},
//     ])
//     console.log(res);
// }

// addOrder();
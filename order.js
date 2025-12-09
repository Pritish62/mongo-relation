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

//one to many  >nth1000
const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
})

//mongoose middleware for delete cusotmer and order autometicaly
customerSchema.post("findOneAndDelete", async (customer) => {
  if(customer.orders.length){
    let res = await Order.deleteMany({_id: {$in: customer.orders}})
    console.log(res)
  }
  // console.log(customer);
})

const Order = mongoose.model("Order", orderSchema)
const Customer = mongoose.model("Customer", customerSchema)

const addCustomer = async () => {
  const cust2 = new Customer({
    name: "ratindra"
})

  const order1 = await Order.findOne({ item: "Daal Fry" })
  const order2 = await Order.findOne({ item: "Rice" })
  const order3 = await Order.findOne({ item: "Biryani" })

  cust2.orders.push(order1)
  cust2.orders.push(order2)
     cust2.orders.push(order3)

  const res = await cust2.save()
  console.log(res)
}

// addCustomer();


const addOrder = async () => {
    let res = await Order.insertMany([
        // {item:"Somsa", price: 12},
        // {item: "Chips",price: 20},
        // {item: "Chai",price: 10},
        {item: "Biryani", price: 180},
        {item: "Daal Fry", price: 80},
        {item: "Rice", price: 90}
    ])
    console.log(res);
}

// addOrder();

// deleteCustomer
const deleteCust = async () => {
let data = await Customer.findByIdAndDelete('6937139512100664a489a874')
console.log(data)
}

deleteCust();
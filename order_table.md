# Documentation for Order table API
Git Link : https://github.com/rahul-srvpl/order_table

# Install Packages
```
yarn
```
or
```
npm i
```
# Run server
```
yarn dev
```
## Schema Models

#### Order Schema
```
(
  {
    orderId: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    orderStatus: {
      type: String,
      enum: ["pending", "delivered", "cancelled", "shipped"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      requird: true,
    },
    totatlProduct: { type: Number },
    amount: { type: String, required: true },
    orderItems: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    shipingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_addresses",
    },
    billingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_addresses",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      enum: ["unpaid", "paid"],
    },
    voucher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupons",
      default: "NA",
    },
    sellerDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
    },
    isCancle: {
      type: String,
      default: false,
    },
    isReturn: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
)
```

#### Add User Address
```http
  POST localhost:3000/v1/u-address/add-new-address
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `"orderStatus"`      | `string` | **Required**. enum: ["pending", "delivered", "cancelled", "shipped"]  |
| `"customerDetails"`      | `string` | **Required**. References id of 'userDetails' schema  |
| `amount`      | `string` | **Required**.  |
| `orderItems`      | `string` | **Required**. References id of 'products' schema |
| `shipingAddress`      | `string` | **Required**.  References id of 'user_addresses' schema  |
| `paymentMethod`      | `string` | **Required**.  |
| `payment`      | `string` | **Required**.  |
| `sellerDetails`      | `string` | **Required**.  References id of 'seller details' schema  |
| `voucher`      | `string` | **Required**. References id of 'coupons' schema |

##### Request Body for add address:
```
{
    "orderStatus":"delivered",
    "userId": "6461bde60c87452feccbe337",
    "totalProduct": "1",
    "amount":"500",
    "orderItems": "6464aeded8fb928dcb0b15a1",
    "shipingAddress": "646362319186750032a80cc8",
    "billingAddress":"646362319186750032a80cc8",
    "paymentMethod": "COD",
    "payment": "unpaid",
    "sellerDetails": "6468bc8c9c52664290a76458",
    "voucher":"64660a84ab5c310032cabdc2"
}
```

#### Get all order details
```http
  POST localhost:3000/v1/order/get-order-data
```
#### filter order table
```http
  POST localhost:3000/v1/order/get-order-data
```
{
    "orderStatus":["pending","cancelled"],
    "payment":["Paid","Unpaid"]
}
#### get paginate data
```http
  POST localhost:3000/v1/order/get-order-data?page=1&limit=3
```
#### Get order by Id
```http
  POST localhost:3000/v1/order/get-order-data/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `string` | **Required**. Id of order to fetch |

##### Request Body with attributes to update:
```
{
    "recommended": "true"
}
```
#### remove Order
```http
  DELETE http://localhost:3000/v1/order/delete/:d
```
#### Search order with order Id
```http
  GET localhost:3000/v1/order/search-order
```
{
    "orderId":"FD183FDADA5A4D29BB47"
}



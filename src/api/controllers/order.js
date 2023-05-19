const orderModel = require("../models/order.model");

const { v4: uuidv4 } = require("uuid");

// Generate an order ID
function generateOrderID() {
  const uniqueID = uuidv4().split("-").join("").toUpperCase();

  const timestamp = Date.now().toString();

  const randomNumber = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");

  const orderID = `${uniqueID}${timestamp}${randomNumber}`.slice(0, 20);

  return orderID;
}

exports.createOrder = (req, res) => {
  try {
    const {
      orderDate,
      customerDetails,
      totalProduct,
      amount,
      orderItems,
      shipingAddress,
      paymentMethod,
      payment,
      voucher,
      sellerDetails,
    } = req.body;
    const orderId = generateOrderID();
    const newOrder = new orderModel({
      orderId,
      orderDate,
      customerDetails,
      totalProduct,
      amount,
      orderItems,
      shipingAddress,
      paymentMethod,
      payment,
      voucher,
      sellerDetails,
    });
    newOrder.save().then((data) => {
      res.status(200).send({ msg: "Order placed", data: data });
    });
  } catch (error) {
    res.status(202).send({ error: error });
  }
};

exports.get_all_orders = (req, res) => {
  try {
    const { orderStatus, payment } = req.body;

    const matchFilters = {};

    if (orderStatus && orderStatus.length > 0) {
      matchFilters.orderStatus = { $in: orderStatus };
    }

    if (payment && payment.length > 0) {
      matchFilters.payment = { $in: payment };
    }

    orderModel
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "customerDetails",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems",
            foreignField: "_id",
            as: "orderItems",
          },
        },
        {
          $lookup: {
            from: "user_addresses",
            localField: "shipingAddress",
            foreignField: "_id",
            as: "shippingAddress",
          },
        },
        {
          $lookup: {
            from: "seller_auths",
            localField: "sellerDetails",
            foreignField: "_id",
            as: "seller_details",
          },
        },
        {
          $lookup: {
            from: "coupons",
            localField: "voucher",
            foreignField: "_id",
            as: "voucher",
          },
        },
        {
          $match: matchFilters
        }
      ])
      .then((data) => {
        res.status(200).send({ msg: "order details", data: data });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

exports.get_order_with_id = (req, res) => {
  try {
    const id = req.params.id;
    orderModel
      .aggregate([
        {
          $match: {
            $expr: {
              $eq: [{ $toString: "$_id" }, id],
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "customerDetails",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems",
            foreignField: "_id",
            as: "orderItems",
          },
        },
        {
          $lookup: {
            from: "user_addresses",
            localField: "shipingAddress",
            foreignField: "_id",
            as: "shippingAddress",
          },
        },
        {
          $lookup: {
            from: "seller_auths",
            localField: "sellerDetails",
            foreignField: "_id",
            as: "seller_details",
          },
        },
        {
          $lookup: {
            from: "coupons",
            localField: "voucher",
            foreignField: "_id",
            as: "voucher",
          },
        },
      ])
      .then((data) => {
        res.status(200).send({ msg: "order details", data: data });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

exports.delete_order = (req, res) => {
  try {
    const id = req.params.id;
    orderModel.findByIdAndDelete(id).then((data) => {
      res.status(202).send({ msg: "order data deleted succesfully" });
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

exports.pagnate_order = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;

    const orders = await orderModel
      .find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalOrder = await orderModel.countDocuments();
    const totalPages = Math.ceil(totalOrder / pageSize);

    res.json({
      orders,
      pageInfo: {
        page,
        pageSize,
        totalOrder,
        totalPages,
      },
    });
  } catch (error) {
    res.send({ error: error });
  }
};

exports.search_Order = async (req, res) => {
  try {
    await orderModel
      .aggregate([
        {
          $match: {
            $and: [
              {
                $or: [
                  {
                    orderId: {
                      $regex: req.body.orderId,
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          $project: {
            __v: 0,
            createdAt: 0,
            updateAt: 0,
          },
        },
      ])
      .then((data) => {
        console.log("data", data);
        return res.status(200).json({
          status: true,
          message: "Order search Sucessfully",
          data: data,
        });
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Invalid id. Server error.",
      error: error,
    });
  }
};

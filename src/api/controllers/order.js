const orderModel = require("../models/order.model");
const { v4: uuidv4 } = require("uuid");

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
      order_date,
      order_status,
      user_id,
      total_product,
      amount,
      order_items,
      shiping_address,
      billing_address,
      payment_method,
      payment,
      voucher,
      seller_details,
    } = req.body;
    const order_id = generateOrderID();
    const newOrder = new orderModel({
      order_id,
      order_date,
      order_status,
      user_id,
      total_product,
      amount,
      order_items,
      shiping_address,
      billing_address,
      payment_method,
      payment,
      voucher,
      seller_details,
    });
    newOrder.save().then((data) => {
      res.status(200).send({ data: data });
    });
  } catch (error) {
    res.status(202).send({ error: error });
  }
};

exports.get_all_orders = (req, res) => {
  try {
    const { order_status, payment, sort_amount, sort_date } = req.body;
    const { page, limit } = req.query;

    const matchFilters = {};

    if (order_status && order_status.length > 0) {
      matchFilters.order_status = { $in: order_status };
    }

    if (payment && payment.length > 0) {
      matchFilters.payment = { $in: payment };
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    
    const sortCriteria = {};

    if (sort_amount) {
      sortCriteria.amount = sort_amount === "asc" ? 1 : -1;
    }

    if (sort_date) {
      sortCriteria.order_date = sort_date === "asc" ? 1 : -1;
    }

const aggregatePipeline = [
      {
        $lookup: {
          from: "products",
          localField: "order_items",
          foreignField: "_id",
          as: "order_items",
        },
      },
      {
        $lookup: {
          from: "user_addresses",
          localField: "shipping_address",
          foreignField: "_id",
          as: "shipping_address",
        },
      },
      {
        $lookup: {
          from: "user_addresses",
          localField: "billing_address",
          foreignField: "_id",
          as: "billing_address",
        },
      },
      {
        $lookup: {
          from: "sellers",
          localField: "seller_details",
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
        $project: {
          order_id: 1,
          order_date: 1,
          order_status: 1,
          total_product: 1,
          amount: 1,
          payment: 1,
          payment_method: 1,
          createdAt: 1,
          "order_items._id": 1,
          "order_items.product_external_id": 1,
          "order_items.item_name": 1,
          "order_items.list_price": 1,
          "seller_details._id": 1,
          "seller_details.fullname": 1,
          "seller_details.email": 1,
          shipping_address: 1,
          billing_address: 1,
          "voucher._id": 1,
          "voucher.coupon_code": 1,
        },
      },
      {
        $match: matchFilters,
      },
      {
        $skip: (pageNumber - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ];

    if (Object.keys(sortCriteria).length > 0) {
      aggregatePipeline.unshift({ $sort: sortCriteria });
    }
    
    orderModel.aggregate(aggregatePipeline)
      .exec()
      .then((data) => {
        res.status(200).send({ data: data });
      });
  } catch (error) {

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
            from: "products",
            localField: "order_items",
            foreignField: "_id",
            as: "order_items",
          },
        },
        {
          $lookup: {
            from: "user_addresses",
            localField: "shipping_address",
            foreignField: "_id",
            as: "shipping_address",
          },
        },
        {
          $lookup: {
            from: "user_addresses",
            localField: "billing_address",
            foreignField: "_id",
            as: "billing_address",
          },
        },
        {
          $lookup: {
            from: "sellers",
            localField: "seller_details",
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
          $project: {
            order_id: 1,
            order_date: 1,
            order_status: 1,
            total_product: 1,
            amount: 1,
            payment: 1,
            payment_method: 1,
            createdAt: 1,
            "order_items._id": 1,
            "order_items.product_external_id": 1,
            "order_items.item_name": 1,
            "order_items.list_price": 1,
            "seller_details._id": 1,
            "seller_details.fullname": 1,
            "seller_details.email": 1,
            shipping_address: 1,
            billing_address: 1,
            "voucher._id": 1,
            "voucher.coupon_code": 1,
          },
        },
      ])
      .then((data) => {
        res.status(200).send({ data: data });
      });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

exports.delete_order = (req, res) => {
  try {
    const id = req.params.id;
    orderModel.findByIdAndDelete(id).then((data) => {
      res.status(202).send({ msg:"deleted succesfully" });
    });
  } catch (error) {
    res.status(500).send({ error: error });
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
                    order_id: {
                      $regex: req.body.order_id,
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
        res.status(200).json({
          status: true,
          data: data,
        });
      });
  } catch (error) {
    console.log(error); // Console log

    res.status(500).json({
      status: false,
      error: error,
    });
  }
};

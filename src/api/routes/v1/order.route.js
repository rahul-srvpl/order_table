const router = require("express").Router();
const orderController = require("../../controllers/order");

router.post("/add-order", orderController.createOrder);
router.post("/get-order-data", orderController.get_all_orders);
router.post("/get-order-data/:id", orderController.get_order_with_id);
router.get("/search-order", orderController.search_Order);
router.post("/delete/:id", orderController.delete_order);

module.exports = router;

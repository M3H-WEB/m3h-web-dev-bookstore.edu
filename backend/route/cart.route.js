import express from "express";
import { deleteCartItem, getCart, sendItem, updateCartItem } from "../controller/cart.controller.js";
const router = express.Router();

router.post("/", sendItem);
router.get("/item/:userId", getCart);
router.delete("/item/:itemId", deleteCartItem);
router.put("/item/:itemId", updateCartItem);

export default router;
import { Router } from "express";
import Razorpay from "razorpay";
const router = Router();

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

router.post("/checkout", async (req, res) => {
  const razorpay = new Razorpay({
    key_id:  "rzp_test_RqckwEGqKZFqMk",
    key_secret: "",
  });

  try {
    const { items, email } = req.body;
    const totalAmount = items.reduce(
      (total, item) => total + Number(item.discountedPrice) * Number(item.quantity),
      0
    )
    const order = await razorpay.orders.create({
      amount: totalAmount * 100, 
      currency: "INR", 
      receipt: `receipt_${Date.now()}`,
      notes: {
        email: email || "",
        items: JSON.stringify(items.map(item => ({ name: item.name, qty: item.quantity }))),
      },
    });
    res.json({
      message: "Server is connected",
      success: true,
      id: order.id,
    });

  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

export default router;
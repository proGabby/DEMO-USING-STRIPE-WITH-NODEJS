const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeController = async (req, res) => {

  const { purchase, total_amount, shipping_fee } = req.body;

  //TODO: verify purchase, total_amount and shipping fee before use
      //do that by maybe using the product id to fetch products from db and using details found on db
  //always verify the product details, total_amount and shipping_fee with what is on the database
  //as client can easily change value from the frontend

  const calculateOrderAmount = () => {
    //WARNING: Ensure values are verify with what is on the db
    //never relied on values from frontend
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  });

  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;

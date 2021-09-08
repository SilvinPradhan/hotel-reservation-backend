const User = require("../models/user");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);
const queryString = require("query-string");

exports.createConnectAccount = async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  console.log("User ==>", user);
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
    });
    console.log("Account ==>", account);
    user.stripe_account_id = account.id;
    user.save();
  }
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: "http://localhost:3000/stripe/callback",
    return_url: "http://localhost:3000/stripe/callback",
    type: "account_onboarding",
  });
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
  console.log("Account linked", accountLink);
  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log("login link ==>", link);
  res.send(link);
};

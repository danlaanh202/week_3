import "dotenv/config";
import Shopify from "shopify-api-node";
export default new Shopify({
  shopName: "AvadaTrainingDan",
  accessToken: process.env.API_ACCESS_TOKEN,
});

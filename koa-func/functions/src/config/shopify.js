import Shopify from "shopify-api-node";
import "dotenv/config";
export default new Shopify({
  shopName: "AvadaTrainingDan",
  accessToken: process.env.API_ACCESS_TOKEN,
});

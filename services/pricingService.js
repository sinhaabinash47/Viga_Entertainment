// const pool = require("../database");
// const PricingService = {
//   calculatePrice: async (organizationId, zone, totalDistance, itemType) => {
//     try {
//       const pricingData = await getPricingFromDatabase(organizationId, zone, itemType);
//       if (!pricingData) {
//         throw new Error("Pricing data not found for the provided parameters");
//       }
//       const { base_distance_in_km, km_price, fix_price } = pricingData;
//       let totalPrice = fix_price;
//       if (totalDistance > base_distance_in_km) {
//         totalPrice += (totalDistance - base_distance_in_km) * km_price;
//       }
//       return totalPrice * 100;
//     } catch (error) {
//       console.error("Error calculating price:", error);
//       throw new Error("Error calculating price");
//     }
//   },
// };

// const getPricingFromDatabase = async (organizationId, zone, itemType) => {
//   try {
//     const client = await pool.connect();
//     console.log("Connected to database successfully.");

//     const queryText = `
//       SELECT base_distance_in_km, km_price, fix_price 
//       FROM pricing 
//       WHERE organization_id = $1 AND zone = $2 AND item_id = (
//         SELECT id FROM item WHERE type = $3
//       )`;
//     const values = [organizationId, zone, itemType];
//     console.log("Query:", queryText, "Values:", values);

//     const result = await client.query(queryText, values);
//     client.release();
//     console.log("Pricing data retrieved successfully:", result.rows);

//     return result.rows[0];
//   } catch (error) {
//     console.error("Error fetching pricing from database:", error);
//     throw new Error("Error fetching pricing from database");
//   }
// };

// module.exports = PricingService;

const Organization = require("../models/organization");
const Item = require("../models/item");
const Pricing = require("../models/pricing");
const pool = require("../database");
const PricingService = {
  async calculatePrice(organizationId, zone, totalDistance, itemType) {
    try {
      const organization = await Organization.getById(organizationId);
      if (!organization) {
        throw new Error("Organization not found");
      }
      const item = await Item.getByType(itemType);
      if (!item) {
        throw new Error("Item not found");
      }
      const pricingData = await Pricing.getByOrganizationIdAndZoneAndItemType(organizationId, zone, itemType);
      if (!pricingData) {
        throw new Error("Pricing data not found for the provided parameters");
      }
      const { base_distance_in_km, km_price, fix_price } = pricingData;
      let totalPrice = fix_price;
      if (totalDistance > base_distance_in_km) {
        totalPrice += (totalDistance - base_distance_in_km) * km_price;
      }
      return totalPrice * 100;
    } catch (error) {
      throw new Error("Error calculating price: " + error.message);
    }
  },
};

module.exports = PricingService;



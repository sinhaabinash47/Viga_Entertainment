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



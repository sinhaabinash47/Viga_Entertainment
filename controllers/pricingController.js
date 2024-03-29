const PricingService = require("../services/pricingService");
const pricingController = {
  calculatePrice: async (req, res) => {
    try {
      const { organization_id, zone, total_distance, item_type } = req.body;
      if (!organization_id || !zone || !total_distance || !item_type) {
        return res.status(400).json({ error: "Missing required parameters" });
      }
      if (typeof organization_id !== 'number' || organization_id <= 0 || !Number.isInteger(organization_id)) {
        return res.status(400).json({ error: "Invalid organization_id. Must be a positive integer." });
      }
      if (typeof zone !== 'string' || zone.trim() === '') {
        return res.status(400).json({ error: "Invalid zone. Must be a non-empty string." });
      }
      if (typeof total_distance !== 'number' || total_distance <= 0) {
        return res.status(400).json({ error: "Invalid total_distance. Must be a positive number." });
      }
      if (typeof item_type !== 'string' || item_type.trim() === '') {
        return res.status(400).json({ error: "Invalid item_type. Must be a non-empty string." });
      }

      if (!organization_id || !zone || !total_distance || !item_type) {
        return res.status(400).json({ error: "Missing required parameters" });
      }
      const totalPriceInCents = await PricingService.calculatePrice(
        organization_id,
        zone,
        total_distance,
        item_type
      );
      const totalPriceInEuros = totalPriceInCents / 100;
      res.json({ total_price: totalPriceInEuros });
    } catch (error) {
      console.error("Error calculating price:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
module.exports = pricingController;


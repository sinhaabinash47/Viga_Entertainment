const pool = require("../database");

const Pricing = {
  async getByOrganizationIdAndZoneAndItemType(organizationId, zone, itemType) {
    try {
      const query = `
        SELECT base_distance_in_km, km_price, fix_price 
        FROM pricing 
        WHERE organization_id = $1 AND zone = $2 AND item_id = (
          SELECT id FROM item WHERE type = $3
        )`;
      const { rows } = await pool.query(query, [organizationId, zone, itemType]);
      return rows.length ? rows[0] : null; // Return null if no data found
    } catch (error) {
      console.error("Error fetching pricing:", error);
      throw new Error("Error fetching pricing from database");
    }
  },
};

module.exports = Pricing;

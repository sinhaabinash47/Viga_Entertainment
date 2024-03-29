const pool = require("../database");

const Item = {
  async getByType(type) {
    try {
      const query = "SELECT * FROM item WHERE type = $1";
      const { rows } = await pool.query(query, [type]);
      return rows[0];
    } catch (error) {
      console.error("Error fetching item:", error);
      throw new Error("Error fetching item from database");
    }
  },
};

module.exports = Item;

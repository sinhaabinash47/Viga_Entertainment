const pool = require("../database");
const Organization = {
  async getById(id) {
    try {
      const query = "SELECT * FROM organization WHERE id = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error fetching organization:", error);
      throw new Error("Error fetching organization from database");
    }
  },
};
module.exports = Organization;

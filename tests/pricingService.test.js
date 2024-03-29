const PricingService = require("../services/pricingService");
const Pricing = require("../models/pricing");

describe("PricingService", () => {
  describe("calculatePrice", () => {
    it("should calculate the price accurately", async () => {
      jest.spyOn(Pricing, "getByOrganizationIdAndZoneAndItemType").mockResolvedValue({
        base_distance_in_km: 5,
        km_price: 1.5,
        fix_price: 10
      });

      // Mock the necessary data for the test case
      const organizationId = 1;
      const zone = "central";
      const totalDistance = 10;
      const itemType = "perishable";

      // Call the calculatePrice function
      const totalPriceInCents = await PricingService.calculatePrice(
        organizationId,
        zone,
        totalDistance,
        itemType
      );

      // Calculate the expected total price
      const expectedTotalPrice = 10 + (10 - 5) * 1.5; // base price + (totalDistance - baseDistance) * kmPrice

      // Assert that the calculated total price matches the expected total price
      expect(totalPriceInCents).toEqual(expectedTotalPrice * 100);
    });

    it("should throw an error if organization or pricing data is not found", async () => {
      // Mock the pricing data not found scenario
      jest.spyOn(Pricing, "getByOrganizationIdAndZoneAndItemType").mockResolvedValue(null);

      // Mock the necessary data for the test case
      const organizationId = 1;
      const zone = "central";
      const totalDistance = 10;
      const itemType = "perishable";

      // Call the calculatePrice function and expect it to throw an error
      await expect(
        PricingService.calculatePrice(organizationId, zone, totalDistance, itemType)
      ).rejects.toThrow("Pricing data not found for the provided parameters");
    });
  });
});

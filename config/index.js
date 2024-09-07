require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  nagerApiUrl: process.env.NAGER_API_URL,
  populationApiUrl: process.env.POPULATION_API_URL,
  flagApiUrl: process.env.FLAG_API_URL,
  iso2ApiUrl: process.env.ISO2_API_URL,
};

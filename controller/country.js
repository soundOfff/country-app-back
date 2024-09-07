const config = require("../config");

const getAllCountries = async (req, res) => {
  try {
    const response = await fetch(`${config.nagerApiUrl}/v3/AvailableCountries`);
    const data = await response.json();
    res.json({
      data: { countries: data },
      code: 200,
      message: "Countries found",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCountry = async (req, res) => {
  const { code } = req.params;
  try {
    const response = await fetch(
      `${config.nagerApiUrl}/v3/CountryInfo/${code}`
    );
    const { status, borders, officialName } = await response.json();

    if (borders === null || status == 404) {
      res.status(404).json({ message: "Country not found", code: 404 });
      return;
    }

    const populationRes = await fetch(config.populationApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: officialName.toLowerCase() }),
    });
    const { data: populationData, error: populationError } =
      await populationRes.json();

    if (populationError) {
      res.status(404).json({ message: "Population data not found", code: 404 });
      return;
    }

    const iso2Res = await fetch(config.iso2ApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: officialName }),
    });
    const { data: iso2Data, error: iso2Error } = await iso2Res.json();

    if (iso2Error) {
      res.status(404).json({ message: "ISO2 data not found", code: 404 });
      return;
    }

    const flagRes = await fetch(config.flagApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        iso2: iso2Data.Iso2,
      }),
    });
    const { data: flagData, error: flagError } = await flagRes.json();

    if (flagError) {
      res.status(404).json({ message: "Flag data not found", code: 404 });
      return;
    }

    res.status(200).json({
      data: { borders: borders, population: populationData, flag: flagData },
      code: 200,
      message: "Country data found",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCountries,
  getCountry,
};

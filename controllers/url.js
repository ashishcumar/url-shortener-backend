const URL = require("../models/url");
const shortid = require("shortid");

const generateShortUrl = async (req, res) => {
  const { url } = req.body;
  console.log(req)
  if (!url) {
    return res.status(400).json({
      error: "url is required",
    });
  }
  const ShortID = shortid();
  const newUrl = await URL.create({
    shortId: ShortID,
    redirectUrl: url,
    visitHistory: [],
  });

  return res.status(200).json({ id: ShortID });
};

const redirectUrl = async (req, res) => {
  const shortId = req.params.id;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectUrl);
};

const getRedirectUrlAnalytics = async (req, res) => {
  const shortId = req.params.id;
  const resp = await URL.findOne({ shortId });
  if (!resp) {
    return res.status(400).json({
      error: `No data found for this short id:- ${shortId}`,
    });
  }
  return res.status(200).json({
    totalClicks: resp.visitHistory.length,
    visitHistory: resp.visitHistory,
  });
};

module.exports = {
  generateShortUrl,
  redirectUrl,
  getRedirectUrlAnalytics,
};

const {
  getAll,
  getOne,
  post,
  deleteOne,
  update,
} = require("../services/campaignsService");

const formatMongoData = require("../utils/formatMongoData");


//get all campaigns
exports.getCampaigns = async (_, res, next) => {
  try {
    const campaigns = await getAll();
    res.status(200).json(formatMongoData(campaigns));
  } catch (error) {
    next(error);
  }
};

//get one campaign
exports.getCampaignById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const campaign = await getOne(id);
    if (!campaign) throw new Error("campaign not found!");
    res.status(200).json(formatMongoData(campaign));
  } catch (error) {
    next(error);
  }
};

//post
const slugify = require("slugify");
exports.postCampaign = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path || req.file.url || "";
    }
    req.body.slug = slugify(req.body.name, { lower: true, strict: true });
    const newCampaign = await post(req.body);
    res.status(201).json(formatMongoData(newCampaign));
  } catch (error) {
    next(error);
  }
};

//delete
exports.deleteCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCampaign = await deleteOne(id);
    if (!deletedCampaign) throw new Error("campaign not found!");
    res.status(200).json(formatMongoData(deletedCampaign));
  } catch (error) {
    next(error);
  }
};

//update
exports.updateCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCampaign = { ...req.body };
    const updatedCampaignResponse = await update(id, updatedCampaign);
    if (!updatedCampaignResponse) throw new Error("campaign not found!");
    res.status(200).json(formatMongoData(updatedCampaignResponse));
  } catch (error) {
    next(error);
  }
};
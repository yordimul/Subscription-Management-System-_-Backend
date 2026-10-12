import Subscription from "../model/subscribtion.model.js";

const createSubscription = async (req, res, next) => {
  try {
    const createdSubscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: createdSubscription,
    });
  } catch (error) {
    next(error);
  }
};



export { createSubscription };
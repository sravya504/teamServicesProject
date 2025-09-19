


import FormFilledData from "../models/formFilledData.model.js";

const formFilledData = async (req, res) => {
  try {
    const formData = req.body;

    const newEntry = new FormFilledData({
      ...formData,
      userId: req.user._id
    });

    await newEntry.save();
    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving form data", error });
  }
};

const getUserForms = async (req, res) => {
  try {
    const userForms = await FormFilledData.find({ userId: req.user._id });
    res.status(200).json({ success: true, data: userForms });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching forms", error });
  }
};

export { formFilledData, getUserForms };

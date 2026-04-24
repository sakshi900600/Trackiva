import * as coverLetterService from "./cover.service.js"; // Assuming service is in the same folder

export const handleSave = async (req, res) => {
  try {
    const letter = await coverLetterService.saveOrUpdateLetter(req.user.id, req.body);
    res.status(200).json({ success: true, data: letter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLetter = async (req, res) => {
  try {
    const letter = await coverLetterService.getLetterByJob(req.user.id, req.params.jobId);
    res.status(200).json({ success: true, data: letter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
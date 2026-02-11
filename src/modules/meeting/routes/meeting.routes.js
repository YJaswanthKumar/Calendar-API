const express = require("express");
const router = express.Router();

const {
  validateCreateMeeting,
} = require("../../../middlewares/validateMeeting.middleware");

const { authenticatingUser } = require("../../../middlewares/auth.middleware");
const { createMeetingHandler } = require("../interface/meeting.controller");
const { listMeetingsHandler } = require("../interface/meeting.controller");
const { getMeetingHandler } = require("../interface/meeting.controller");
const { updateMeetingHandler } = require("../interface/meeting.controller");
const { deleteMeetingHandler } = require("../interface/meeting.controller");

router.post(
  "/",
  authenticatingUser,
  validateCreateMeeting,
  createMeetingHandler,
);
router.get("/", authenticatingUser, listMeetingsHandler);
router.get("/:id", authenticatingUser, getMeetingHandler);
router.put("/:id", authenticatingUser, updateMeetingHandler);
router.delete("/:id", authenticatingUser, deleteMeetingHandler);

module.exports = router;

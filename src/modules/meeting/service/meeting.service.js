const Meeting = require("../model/meeting.model");
const User = require("../../user/model/user.model");
const { Op } = require("sequelize");

async function createMeeting(data) {
  const { userId, title, startTime, endTime } = data;

  const user = await User.findByPk(userId);
  if (!user) {
    return {
      error: "User not found",
      status: 404,
    };
  }
  const startTimeslot = new Date(startTime);
  const endTimeslot = new Date(endTime);

  if (isNaN(startTimeslot) || isNaN(endTimeslot)) {
    return {
      error: "Invalid date format",
      status: 400,
    };
  }

  if (startTimeslot >= endTimeslot) {
    return {
      error: "startTime must be before endTime",
      status: 400,
    };
  }

  const conflict = await Meeting.findOne({
    where: {
      userId,
      startTime: { [Op.lt]: endTimeslot },
      endTime: { [Op.gt]: startTimeslot },
    },
  });

  if (conflict) {
    return {
      error: "Time slot already booked",
      status: 400,
    };
  }

  const meeting = await Meeting.create({
    userId,
    title,
    startTime,
    endTime,
  });

  return meeting;
}

async function listMeetings(query) {
  const { userId, startDate, endDate } = query;

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (startDate || endDate) {
    where.startTime = {};

    if (startDate) {
      where.startTime[Op.gte] = new Date(startDate);
    }

    if (endDate) {
      where.startTime[Op.lte] = new Date(endDate);
    }
  }

  const meetings = await Meeting.findAll({
    where,
    order: [["startTime", "ASC"]],
  });

  return meetings;
}

async function getMeetingById(id) {
  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    return {
      error: "Meeting not found",
      status: 404,
    };
  }

  return meeting;
}

async function updateMeeting(id, data) {
  const { userId, title, startTime, endTime } = data;

  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    return {
      error: "Meeting not found",
      status: 404,
    };
  }

  const startTimeSlot = new Date(startTime);
  const endTimeSlot = new Date(endTime);

  if (isNaN(startTimeSlot) || isNaN(endTimeSlot)) {
    return {
      error: "Invalid date format",
      status: 400,
    };
  }

  if (startTimeSlot >= endTimeSlot) {
    return {
      error: "startTime must be before endTime",
      status: 400,
    };
  }

  const conflict = await Meeting.findOne({
    where: {
      userId,
      id: { [Op.ne]: id },
      startTime: { [Op.lt]: endTimeSlot },
      endTime: { [Op.gt]: startTimeSlot },
    },
  });

  if (conflict) {
    return {
      error: "Time slot already booked",
      status: 400,
    };
  }

  await meeting.update({
    userId,
    title,
    startTime,
    endTime,
  });

  return meeting;
}

async function deleteMeeting(id) {
  const meeting = await Meeting.findByPk(id);

  if (!meeting) {
    return {
      error: "Meeting not found",
      status: 404,
    };
  }

  await meeting.destroy();

  return { success: true };
}

module.exports = {
  createMeeting,
  listMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};

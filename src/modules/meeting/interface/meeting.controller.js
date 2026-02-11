const { createMeeting } = require("../service/meeting.service");
const { listMeetings } = require("../service/meeting.service");
const { getMeetingById } = require("../service/meeting.service");
const { updateMeeting } = require("../service/meeting.service");
const { deleteMeeting } = require("../service/meeting.service");

const createMeetingHandler = async (request, response, next) => {
  try {
    const result = await createMeeting(request.body);

    if (result.error) {
      const error = new Error(result.error);
      error.status = result.status;
      return next(error);
    }

    return response.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const listMeetingsHandler = async (request, response, next) => {
  try {
    const meetings = await listMeetings(request.query);
    response.status(200).json(meetings);
  } catch (err) {
    next(err);
  }
};

const getMeetingHandler = async (request, response, next) => {
  try {
    const result = await getMeetingById(request.params.id);

    if (result.error) {
      const error = new Error(result.error);
      error.status = result.status;
      return next(error);
    }

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const updateMeetingHandler = async (request, response, next) => {
  try {
    const result = await updateMeeting(request.params.id, request.body);

    if (result.error) {
      const error = new Error(result.error);
      error.status = result.status;
      return next(error);
    }

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteMeetingHandler = async (request, response, next) => {
  try {
    const result = await deleteMeeting(request.params.id);

    if (result.error) {
      const error = new Error(result.error);
      error.status = result.status;
      return next(error);
    }

    response.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createMeetingHandler,
  listMeetingsHandler,
  getMeetingHandler,
  updateMeetingHandler,
  deleteMeetingHandler,
};

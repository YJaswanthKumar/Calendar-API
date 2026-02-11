function validateCreateMeeting(request, response, next) {
  const { userId, title, startTime, endTime } = request.body;

  if (!userId || !title || !startTime || !endTime) {
    const error = new Error("Required fields missing");
    error.status = 400;
    return next(error);
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    const error = new Error("Invalid date format");
    error.status = 400;
    return next(error);
  }

  next();
}

module.exports = {
  validateCreateMeeting,
};

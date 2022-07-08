const { formatDistance } = require("date-fns");

function formatMsg(messages) {
  const result = [];
  if (messages.length === 0) return {};
  messages.forEach((message) => {
    result.push({
      username: message.username,
      message: message.message,
      date: formatDistance(new Date(message.date), new Date(), { addSuffix: true }),
    });
  });
  return result.reverse();
}

module.exports = { formatMsg };

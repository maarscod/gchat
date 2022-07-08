const { formatDistance } = require("date-fns");

function formatMsg(messages) {
  const result = [];
  if (messages.length === 0) return {};
  messages.forEach((message) => {
    result.push({
      name: message.name,
      message: message.message,
      date: formatDistance(new Date(message.date), new Date(), { addSuffix: true }),
    });
  });
  result.sort();
  return result;
}

module.exports = { formatMsg };

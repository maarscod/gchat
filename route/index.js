const express = require("express");
const { format: json2lua } = require("lua-json");

const Message = require("../model/Message");
const { formatMsg } = require("../utils/utils");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const messages = await Message.find({});
    res.send(json2lua(formatMsg(messages)));
  })
  .post(async (req, res) => {
    const { username, message } = req.body;
    try {
      await new Message({
        username,
        message,
      }).save();
      res.status(200).send(json2lua({ success: true, result: "message sent" }));
    } catch (error) {
      console.log(error);
      res.status(500).send(json2lua({ success: false, result: error.message }));
    }
  });

module.exports = router;

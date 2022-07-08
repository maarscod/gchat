const express = require("express");
const { format: json2lua } = require("lua-json");

const Message = require("../model/Message");
const { formatMsg } = require("../utilities/utils");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const messages = await Message.find({});
    res.status(200).send(
      json2lua({
        result: {
          success: true,
          message: "",
        },
        data: formatMsg(messages),
      })
    );
  })
  .post(async (req, res) => {
    try {
      await new Message({
        username: req.body.username,
        message: req.body.message,
      }).save();
      res.status(200).send(
        json2lua({
          result: {
            success: true,
            message: "Message sent",
          },
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).send(
        json2lua({
          result: {
            success: false,
            message: error?.message || error || "Failed to send message",
          },
        })
      );
    }
  });

router.all("*", (req, res) => {
  res.send(
    json2lua({
      result: {
        success: false,
        message: "(404) Invalid endpoint",
      },
    })
  );
});

module.exports = router;

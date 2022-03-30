const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const urls = [
        {origin: "www.google.com/blueweb1", shortUrl: "asdasda1"},
        {origin: "www.google.com/blueweb2", shortUrl: "asdasda2"},
        {origin: "www.google.com/blueweb3", shortUrl: "asdasda3"}
    ]
    res.render("home", {urls});
});

module.exports = router;

const express = require("express");
const router = express.Router();

// بيانات إحصائية وهمية (يجب استبدالها بقاعدة بيانات)
const adminStats = {
  "123456789": { bans: 10, mutes: 5, tickets: 20, warnings: 3, rank: "Moderator" },
  "987654321": { bans: 25, mutes: 15, tickets: 50, warnings: 8, rank: "Admin" },
};

router.get("/stats/:id", (req, res) => {
  const userId = req.params.id;
  if (adminStats[userId]) {
    res.json(adminStats[userId]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;

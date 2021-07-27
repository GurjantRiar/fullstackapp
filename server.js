const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.post("/", (req, res) => res.send("API RUNNING"));
// define routes
app.use("/api/users", require("./config/routes/api/users"));
app.use("/api/posts", require("./config/routes/api/posts"));
app.use("/api/profile", require("./config/routes/api/profile"));
app.use("/api/auth", require("./config/routes/api/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

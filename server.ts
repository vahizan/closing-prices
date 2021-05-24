import express from "express";
import ClosingPricesRoutes from "./routes/ClosingPrices";

const cors = require("cors");

const app = express();

app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:3000" }));
}
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(ClosingPricesRoutes);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

export default app;

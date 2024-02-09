import app from "@benoitquette/audeets-api-commons/app.js";
import server from "@benoitquette/audeets-api-commons/server.js";
import google from "./auth/google.js";
import userRouter from "./routes/user.js";
import authRoute from "./routes/auth.js";

const expressApp = app.createApp("GET");
google.init();
expressApp.use("/api/user", userRouter);
expressApp.use("/api/auth", authRoute);
server.createServer(expressApp, "6080", "6443");

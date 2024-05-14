"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const MongoDB_1 = require("../config/MongoDB");
const TaskRoute_1 = require("../routers/TaskRoute");
const app = (0, express_1.default)();
const PORT = 8080;
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
(0, MongoDB_1.connectToDB)();
app.use(TaskRoute_1.router);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static("public"));
app.post("/api/search-jobs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    const response = yield axios_1.default.get(`https://api.infojobs.net/api/1/offer?keywords=${prompt}`, {
        headers: {
            Authorization: "Bearer YOUR_API_KEY",
            "Api-Consumer-Key": "YOUR_CONSUMER_KEY",
        },
    });
    const jobs = response.data.offers.map((offer) => ({
        title: offer.title,
        link: offer.links[0].href,
    }));
    res.status(200).json({ jobs });
}));
app.listen(3000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:3000`);
});

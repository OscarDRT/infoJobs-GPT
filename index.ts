import express, { Express, Request, Response } from "express";
import axios from "axios";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

type URLParams = null;
type RequestBody = { prompt: string };
type ResponseBody = { jobs: { title: string; link: string }[] };

app.post(
  "/api/search-jobs",
  async (req: Request<URLParams, ResponseBody, RequestBody>, res: Response) => {
    const { prompt } = req.body;
    const response = await axios.get(
      `https://api.infojobs.net/api/1/offer?keywords=${prompt}`,
      {
        headers: {
          Authorization: "Bearer YOUR_API_KEY",
          "Api-Consumer-Key": "YOUR_CONSUMER_KEY",
        },
      }
    );
    const jobs = response.data.offers.map((offer: any) => ({
      title: offer.title,
      link: offer.links[0].href,
    }));
    res.status(200).json({ jobs });
  }
);

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:3000`);
});
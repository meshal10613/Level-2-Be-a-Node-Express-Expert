import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express();
const port = 5000;
const pool = new Pool({
	connectionString: `postgresql://neondb_owner:npg_Ya2ndR5HLWwg@ep-tiny-wind-a4wnhzgh-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
})

//? middleware
app.use(express.json()); // for json data
app.use(express.urlencoded()); // for form data

app.get("/", async (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.post("/", async (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);

    res.status(201).json({
        success: true,
        message: "API is working....",
        path: req.url,
        data: req.body,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

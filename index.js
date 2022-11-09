require("colors");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Middle Wire
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Pahlovi Server Running Okk");
});

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.v2g7zap.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const fun = async () => {
    await client.connect();
    const servicesCategories = client.db("photoGrapher-services").collection("categories");
    // Get Services From Server
    app.get("/services", async (req, res) => {
        const showLimit = parseInt(req.query.limit);
        const curser = servicesCategories.find({});
        const categories = await curser.limit(showLimit).toArray();
        res.send(categories);
    });
    //Get Service by id
    app.get("/service/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const service = await servicesCategories.findOne(query);
        res.send(service);
    });
    // New Service Added
    app.post("/services", async (req, res) => {
        const result = await servicesCategories.insertOne(req.body);
        if (result.insertedId) {
            res.send({
                success: true,
                message: "New services Added",
            });
        }
    });

    const feedbackes = client.db("photoGrapher-services").collection("feedbackes");
    // Update Review
    app.post("/feedbackes", async (req, res) => {
        const result = await feedbackes.insertOne(req.body);
        if (result.insertedId) {
            res.send({
                success: true,
                message: "Feedback Updated",
            });
        }
    });
    app.get("/feedback/:id", async (req, res) => {
        const id = req.params.id;
        const query = { serviceId: id };
        const curser = feedbackes.find(query);
        const thisFeedbackes = await curser.toArray();
        res.send(thisFeedbackes);
    });
    // Get Product by email
    app.get("/feedbacksbyemail", async (req, res) => {
        const email = req.query.email;
        const curser = feedbackes.find({ email });
        const feedbackesbyemail = await curser.toArray();
        res.send(feedbackesbyemail);
    });
    // Delete Feedback
    app.delete("/feedbackdelete/:id", async (req, res) => {
        const { id } = req.params;
        const result = await feedbackes.deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount) {
            res.send({
                success: true,
                message: "Successfully deleted Feedback",
            });
        }
    });
};
fun().catch((error) => console.log(`${error.name.bgRed.bold}: ${error.message.red}`));

app.listen(port, () => {});

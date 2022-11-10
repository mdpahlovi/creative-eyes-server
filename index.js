require("colors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
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

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.swudvpp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// JWT verify
function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "Unauthorized access" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: "Forbidden access" });
        }
        req.decoded = decoded;
        next();
    });
}

const fun = async () => {
    const servicesCategories = client.db("photoGrapher-services").collection("categories");
    const reviews = client.db("photoGrapher-services").collection("reviews");

    app.post("/jwt", (req, res) => {
        const user = req.body;
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2d" });
        res.send({ token });
    });

    // Get Services From Server
    app.get("/services", async (req, res) => {
        const showLimit = parseInt(req.query.limit);
        const curser = servicesCategories.find({});
        const categories = await curser.limit(showLimit).toArray();
        res.send(categories);
    });
    //Get Service by id
    app.get("/service/:id", async (req, res) => {
        const { id } = req.params;
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
                message: "New Service Added",
            });
        }
    });

    // Update Review
    app.post("/reviews", async (req, res) => {
        const result = await reviews.insertOne(req.body);
        if (result.insertedId) {
            res.send({
                success: true,
                message: "New Review Added",
            });
        }
    });
    // Get Review By Service ID
    app.get("/review/:id", async (req, res) => {
        const { id } = req.params;
        const query = { serviceId: id };
        const curser = reviews.find(query);
        const thisreviews = await curser.toArray();
        res.send(thisreviews);
    });
    // Get Product by email
    app.get("/reviewsbyemail", verifyJWT, async (req, res) => {
        const { email } = req.query;
        const curser = reviews.find({ email });
        const reviewsbyemail = await curser.toArray();
        res.send(reviewsbyemail);
    });
    // Delete review
    app.delete("/reviewdelete/:id", async (req, res) => {
        const { id } = req.params;
        const result = await reviews.deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount) {
            res.send({
                success: true,
                message: "Successfully Deleted Review",
            });
        }
    });
    // Edit Review
    app.get("/reviewbyid/:id", async (req, res) => {
        const { id } = req.params;
        const query = { _id: ObjectId(id) };
        const review = await reviews.findOne(query);
        res.send(review);
    });
    app.patch("/reviewedit/:id", async (req, res) => {
        const { id } = req.params;
        const result = await reviews.updateOne({ _id: ObjectId(id) }, { $set: req.body });
        if (result.matchedCount) {
            res.send({
                success: true,
                message: "Successfully Updated Review",
            });
        }
    });
};
fun().catch((error) => console.log(`${error.name.bgRed.bold}: ${error.message.red}`));

app.listen(port, () => {});

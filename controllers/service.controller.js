const Service = require("../models/service.model");

exports.getAllServices = async (req, res) => {
    const services = await Service.find({});
    res.send(services);
};

exports.postServices = async (req, res) => {
    const service = req.body;
    const newService = new Service(service);
    const result = await newService.save();
    res.send({ acknowledge: true, insertedId: result._id });
};

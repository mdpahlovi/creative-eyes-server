const Service = require("../models/service.model");

exports.getAllServices = async (req, res) => {
    const services = await Service.find({});
    res.send(services);
};

exports.getService = async (req, res) => {
    const { id } = req.params;
    const service = await Service.findById(id);
    res.send(service);
};

exports.postServices = async (req, res) => {
    const service = req.body;
    const newService = new Service(service);
    const result = await newService.save();
    res.send({ acknowledge: true, insertedId: result._id });
};

exports.updateService = async (req, res) => {
    const { id } = req.params;
    const result = await Service.findByIdAndUpdate(id, { $set: req.body });
    res.send({ acknowledge: true, updatedId: result._id });
};

exports.deleteService = async (req, res) => {
    const { id } = req.params;
    const result = await Service.findByIdAndRemove(id);
    res.send({ acknowledge: true, deletedId: result._id });
};

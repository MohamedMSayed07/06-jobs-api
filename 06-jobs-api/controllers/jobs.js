const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');



module.exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt');
  res.status(StatusCodes.OK).json({count: jobs.length, jobs});
};

module.exports.getJob = async (req, res) => {
  const {user:{userId}, params:{id:jobId}} = req;

  const job = await Job.findOne({_id: jobId, createdBy: userId});
  if(!job){
    throw new NotFoundError(`No job with Id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({job});
};

module.exports.createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({job});
};

module.exports.updateJob = async (req, res) => {
  const {body: {company,position}, user: {userId}, params: {id:jobId}} = req;

  if(company === '' || position === ''){
    throw new BadRequestError('Company or Positin fields cannot be empty!!')
  }
  const job = await Job.findOneAndUpdate({_id: jobId, createdBy: userId}, req.body, {new: true, runValidators: true});
  if(!job){
    throw new NotFoundError(`No job with Id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({job});
};

module.exports.deleteJob = async (req, res) => {
  const {user:{userId}, params:{id:jobId}} = req;

  const job = await Job.findOneAndDelete({_id: jobId, createdBy: userId});
  if(!job){
    throw new NotFoundError(`No job with Id: ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};
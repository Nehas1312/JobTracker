import Job from "../../models/job.model.js";

export const getAllJobs = async (userId, { status, search }) => {
  const filter = { user: userId };

  if (status && status !== "All") filter.status = status;

  if (search) {
    filter.$or = [
      { company: { $regex: search, $options: "i" } },
      { role:    { $regex: search, $options: "i" } },
      { location:{ $regex: search, $options: "i" } },
    ];
  }

  const jobs = await Job.find(filter).sort({ createdAt: -1 });

  // Count per status for the stats bar on the frontend
  const stats = await Job.aggregate([
    { $match: { user: userId } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  return { jobs, stats };
};

export const getSingleJob = async (userId, jobId) => {
  const job = await Job.findOne({ _id: jobId, user: userId });
  if (!job) throw new Error("Job not found");
  return job;
};

export const createNewJob = async (userId, jobData) => {
  const job = await Job.create({ ...jobData, user: userId });
  return job;
};

export const updateExistingJob = async (userId, jobId, jobData) => {
  const job = await Job.findOneAndUpdate(
    { _id: jobId, user: userId },
    jobData,
    { new: true, runValidators: true }
  );
  if (!job) throw new Error("Job not found");
  return job;
};

export const deleteExistingJob = async (userId, jobId) => {
  const job = await Job.findOneAndDelete({ _id: jobId, user: userId });
  if (!job) throw new Error("Job not found");
  return job;
};

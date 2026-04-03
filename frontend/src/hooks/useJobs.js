import { useState, useEffect, useCallback } from "react";
import { getJobs, createJob, updateJob, deleteJob } from "../api/jobsApi";

export const useJobs = () => {
  const [jobs, setJobs]       = useState([]);
  const [stats, setStats]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchJobs = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getJobs(params);
      setJobs(data.jobs);
      setStats(data.stats);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const addJob = async (jobData) => {
    const { data } = await createJob(jobData);
    setJobs((prev) => [data.job, ...prev]);
    return data.job;
  };

  const editJob = async (id, jobData) => {
    const { data } = await updateJob(id, jobData);
    setJobs((prev) => prev.map((j) => (j._id === id ? data.job : j)));
    return data.job;
  };

  const removeJob = async (id) => {
    await deleteJob(id);
    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  const changeStatus = async (id, status) => {
    // Optimistic update
    setJobs((prev) => prev.map((j) => (j._id === id ? { ...j, status } : j)));
    try {
      await updateJob(id, { status });
    } catch {
      fetchJobs(); // revert on failure
    }
  };

  return { jobs, stats, loading, error, fetchJobs, addJob, editJob, removeJob, changeStatus };
};

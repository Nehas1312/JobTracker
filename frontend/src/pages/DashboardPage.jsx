import { useState, useMemo } from "react";
import { useJobs } from "../hooks/useJobs";
import { useToast } from "../hooks/useToast";
import Navbar from "../components/layout/Navbar";
import StatsBar from "../components/jobs/StatsBar";
import FilterBar from "../components/jobs/FilterBar";
import KanbanBoard from "../components/jobs/KanbanBoard";
import JobListView from "../components/jobs/JobListView";
import JobModal from "../components/jobs/JobModal";
import Toast from "../components/ui/Toast";

export default function DashboardPage() {
  const { jobs, stats, loading, error, addJob, editJob, removeJob, changeStatus } = useJobs();
  const { toast, showToast } = useToast();

  const [view, setView]               = useState("kanban");
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modalOpen, setModalOpen]     = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return jobs.filter((j) => {
      const matchQ = !q || j.company.toLowerCase().includes(q) || j.role.toLowerCase().includes(q) || (j.location || "").toLowerCase().includes(q);
      const matchS = filterStatus === "All" || j.status === filterStatus;
      return matchQ && matchS;
    });
  }, [jobs, search, filterStatus]);

  const openAdd  = () => { setSelectedJob(null); setModalOpen(true); };
  const openEdit = (job) => { setSelectedJob(job); setModalOpen(true); };

  const handleSave = async (form) => {
    if (selectedJob) {
      await editJob(selectedJob._id, form);
      showToast("Job updated");
    } else {
      await addJob(form);
      showToast("Job added");
    }
  };

  const handleDelete = async (id) => {
    await removeJob(id);
    showToast("Job removed", "error");
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading your jobs…</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar view={view} setView={setView} />

      <div style={{ padding: "24px 32px", maxWidth: 1400, margin: "0 auto" }}>
        {error && (
          <div style={{ background: "#7F1D1D", border: "1px solid #EF4444", color: "#FCA5A5", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13 }}>
            {error}
          </div>
        )}

        <StatsBar
          stats={stats}
          totalJobs={jobs.length}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <FilterBar
          search={search}
          setSearch={setSearch}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onAddJob={openAdd}
        />

        {view === "kanban" ? (
          <KanbanBoard
            jobs={filtered}
            onEdit={openEdit}
            onDelete={handleDelete}
            onStatusChange={changeStatus}
          />
        ) : (
          <JobListView
            jobs={filtered}
            onEdit={openEdit}
            onDelete={handleDelete}
            onStatusChange={changeStatus}
          />
        )}
      </div>

      <JobModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editJob={selectedJob}
      />

      <Toast toast={toast} />
    </div>
  );
}

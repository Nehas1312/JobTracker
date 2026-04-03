export const STATUSES = ["Saved", "Applied", "Interview", "Offer", "Rejected"];

export const STATUS_STYLES = {
  Saved:     { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D", dot: "#F59E0B" },
  Applied:   { bg: "#DBEAFE", text: "#1E40AF", border: "#93C5FD", dot: "#3B82F6" },
  Interview: { bg: "#EDE9FE", text: "#5B21B6", border: "#C4B5FD", dot: "#8B5CF6" },
  Offer:     { bg: "#D1FAE5", text: "#065F46", border: "#6EE7B7", dot: "#10B981" },
  Rejected:  { bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5", dot: "#EF4444" },
};

export const EMPTY_FORM = {
  company: "", role: "", status: "Applied",
  appliedDate: "", location: "", salary: "", link: "", notes: "",
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

export const getStatCount = (stats, status) => {
  const found = stats.find((s) => s._id === status);
  return found ? found.count : 0;
};

export const PIPELINE_STAGES = ["Applied", "Screening", "Interview", "Offer"];

export const getStageIndex = (status) => PIPELINE_STAGES.indexOf(status);

export const getProgressPercent = (status) => {
  const index = getStageIndex(status);
  if (index === -1) return 0;
  return (index / (PIPELINE_STAGES.length - 1)) * 100;
};

export const isStageCompleted = (currentStatus, stage) => {
  const currentIndex = getStageIndex(currentStatus);
  const stageIndex = getStageIndex(stage);
  if (currentIndex === -1 || stageIndex === -1) return false;
  return stageIndex <= currentIndex;
};

export const isCurrentStage = (currentStatus, stage) =>
  currentStatus === stage;

export const getStatusColor = (status) => {
  const map = {
    Applied: "#6366f1",
    Screening: "#f59e0b",
    Interview: "#3b82f6",
    Offer: "#10b981",
    Rejected: "#ef4444",
  };
  return map[status] || "#94a3b8";
};

export const getStatusBg = (status) => {
  const map = {
    Applied: "#eef2ff",
    Screening: "#fef3c7",
    Interview: "#dbeafe",
    Offer: "#d1fae5",
    Rejected: "#fee2e2",
  };
  return map[status] || "#f1f5f9";
};
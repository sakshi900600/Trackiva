// Pipeline stages (order matters)
export const PIPELINE_STAGES = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
];

// Get index of current stage
export const getStageIndex = (status) => {
  return PIPELINE_STAGES.indexOf(status);
};

// Get progress percentage (0 → 100)
export const getProgressPercent = (status) => {
  const index = getStageIndex(status);
  const totalStages = PIPELINE_STAGES.length - 1;

  if (index === -1) return 0;

  return (index / totalStages) * 100;
};

// Check if a stage is completed
export const isStageCompleted = (currentStatus, stage) => {
  const currentIndex = getStageIndex(currentStatus);
  const stageIndex = getStageIndex(stage);

  if (currentIndex === -1 || stageIndex === -1) return false;

  return stageIndex <= currentIndex;
};

// Get next stage (optional helper)
export const getNextStage = (currentStatus) => {
  const index = getStageIndex(currentStatus);

  if (index === -1) return PIPELINE_STAGES[0];

  if (index < PIPELINE_STAGES.length - 1) {
    return PIPELINE_STAGES[index + 1];
  }

  return currentStatus;
};

// Get previous stage (optional)
export const getPreviousStage = (currentStatus) => {
  const index = getStageIndex(currentStatus);

  if (index > 0) {
    return PIPELINE_STAGES[index - 1];
  }

  return currentStatus;
};

// Status color mapping (for UI styling)
export const getStatusColor = (status) => {
  switch (status) {
    case "Applied":
      return "#6366f1"; // indigo
    case "Screening":
      return "#f59e0b"; // amber
    case "Interview":
      return "#3b82f6"; // blue
    case "Offer":
      return "#22c55e"; // green
    default:
      return "#9ca3af"; // gray
  }
};

// Validate status (safety check)
export const isValidStatus = (status) => {
  return PIPELINE_STAGES.includes(status);
};
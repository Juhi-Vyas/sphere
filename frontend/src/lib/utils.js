export const getDifficultyBadgeClass  = (difficulty) => {

  if (difficulty === "Easy") {
    return "badge-success";
  }

  if (difficulty === "Medium") {
    return "badge-warning";
  }

  return "badge-error";

};
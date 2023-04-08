export function statusBadgeColor(status: string) {
  if (status === "Active") {
    return "badge-success";
  }
  else if (status === "Deactivated") {
    return "badge-danger";
  }
  return "badge-info";
}

export function standingBadgeColor(standing: string) {
  if (standing === "All Good") {
    return "badge-success";
  }
  else if (standing === "Okay") {
    return "badge-warning";
  }
  else if (standing === "Forced Exit") {
    return "badge-dark";
  }
  else if (standing === "N/A") {
    return "badge-info";
  }
  else {
    return "badge-danger";
  }
}

export const getMatchScorePercentage = (score: string): number => {
  const parsed = parseFloat(score);
  return isNaN(parsed) ? 0 : Math.floor(parsed * 100);
};

export const getMatchGradient = (score: string): string => {
  const percentage = getMatchScorePercentage(score);
  if (percentage >= 80) {
    return "from-green-50 to-blue-50";
  } else if (percentage >= 60) {
    return "from-green-50 to-emerald-50";
  } else if (percentage >= 40) {
    return "from-yellow-50 to-amber-50";
  } else if (percentage >= 20) {
    return "from-orange-50 to-amber-50";
  } else {
    return "from-red-50 to-orange-50";
  }
};

export const getIconBgColor = (score: string): string => {
  const percentage = getMatchScorePercentage(score);
  if (percentage >= 80) {
    return "bg-green-100";
  } else if (percentage >= 60) {
    return "bg-emerald-100";
  } else if (percentage >= 40) {
    return "bg-yellow-100";
  } else if (percentage >= 20) {
    return "bg-orange-100";
  } else {
    return "bg-red-100";
  }
};

export const getIconColor = (score: string): string => {
  const percentage = getMatchScorePercentage(score);
  if (percentage >= 80) {
    return "text-green-600";
  } else if (percentage >= 60) {
    return "text-emerald-600";
  } else if (percentage >= 40) {
    return "text-yellow-600";
  } else if (percentage >= 20) {
    return "text-orange-600";
  } else {
    return "text-red-600";
  }
};

export const getBadgeColors = (score: string): string => {
  const percentage = getMatchScorePercentage(score);
  if (percentage >= 80) {
    return "bg-green-100 text-green-700";
  } else if (percentage >= 60) {
    return "bg-emerald-100 text-emerald-700";
  } else if (percentage >= 40) {
    return "bg-yellow-100 text-yellow-700";
  } else if (percentage >= 20) {
    return "bg-orange-100 text-orange-700";
  } else {
    return "bg-red-100 text-red-700";
  }
};

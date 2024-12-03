export const formatTime = (time: number): string => {
  if (time < 60) {
    return `${time} seconds`;
  } else if (time >= 60 && time < 120) {
    return `1 minute`;
  } else {
    return `${Math.floor(time / 60)} minutes`;
  }
};

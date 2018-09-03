export const FULL_ARC = 360;
export const HALF_ARC = 180;
export const PI = Math.PI;

export const convertPercentageToDegrees = (percentage) => {
  return Math.ceil(FULL_ARC * (percentage/100));
};

export const convertDegreesToRadians = (degrees) => {
  return ((degrees/HALF_ARC) * PI);
};

export const convertPercentageToRadians = (percentage) => {
  const degrees = convertPercentageToDegrees(percentage);
  return convertDegreesToRadians(degrees);
};
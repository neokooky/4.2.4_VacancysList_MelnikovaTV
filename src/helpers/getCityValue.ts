import { cityOptions, RegionValue } from "../constants";

export const getCityValue = (value: string | null) => {
  const city = cityOptions.find((option) => option.label === value);
  const cityValue = city?.value || RegionValue.All;
  return cityValue;
};

export enum RegionValue {
  All = "",
  Moscow = "1",
  SaintPetersburg = "2",
}

export const cityOptions = [
  { value: RegionValue.All, label: "Все" },
  { value: RegionValue.Moscow, label: "Москва" },
  { value: RegionValue.SaintPetersburg, label: "Санкт-Петербург" },
];

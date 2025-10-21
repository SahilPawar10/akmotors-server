import moment from "moment";

export function parseDateInfo(isoString: string) {
  const m = moment(isoString);

  return {
    date: m.format("DD MMM YYYY"), // e.g. "15 Oct 2025"
    month: m.format("MMM"), // e.g. "Oct"
    year: m.year(), // e.g. 2025
  };
}

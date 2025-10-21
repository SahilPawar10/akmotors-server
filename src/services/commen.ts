import moment from "moment";
import * as xlsx from "xlsx";

export function parseDateInfo(isoString: string) {
  const m = moment(isoString);

  return {
    date: m.format("DD MMM YYYY"), // e.g. "15 Oct 2025"
    month: m.format("MMM"), // e.g. "Oct"
    year: m.year(), // e.g. 2025
  };
}

interface JsonRow {
  [key: string]: string | number | boolean | null;
}

/**
 * Converts an Excel file buffer into a JSON array using the xlsx library.
 */
export const convertExcelBufferFileToJsonUsingXlsx = (buffer: Buffer): JsonRow[] => {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetNames = workbook.SheetNames;
  const parsedData: JsonRow[] = [];

  for (let i = 0; i < sheetNames.length; i++) {
    const sheet = workbook.Sheets[sheetNames[i]];
    const tempData: JsonRow[] = xlsx.utils.sheet_to_json(sheet, { raw: false });

    // Filter out empty rows
    const filteredJson = tempData.filter((row) =>
      Object.values(row).some((cellValue) => cellValue !== null && cellValue !== ""),
    );

    parsedData.push(...filteredJson);
  }

  return parsedData;
};

/**
 * Generates an Excel file buffer from JSON data and column headers.
 */
export const generateExcelFileBuffer = (
  data: JsonRow[],
  columnHeaders: string[],
  filename: string,
): Buffer => {
  const workbook = xlsx.utils.book_new();

  const worksheetData: any[][] = [columnHeaders];

  data.forEach((row) => {
    const dataRow = columnHeaders.map((header) => row[header] ?? "");
    worksheetData.push(dataRow);
  });

  const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
  xlsx.utils.book_append_sheet(workbook, worksheet, filename);

  const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
  return buffer;
};

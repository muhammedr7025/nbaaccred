
export async function convertCsvToJson(file: File) {
    if (file.type !== 'text/csv') {
        throw new Error('File is not a CSV file');
    }
    const data = await file.text();
    const csvData = data.toString();
    const csv = csvData.split('\n');
    const headers = csv[0].split(',').map((header) => header.trim());
    const rows = csv.slice(1).map((row) => {
        const values = row.split(',');
        const obj: { [key: string]: string } = {};
        headers.forEach((header, index) => {
            obj[header] = values[index];
        });
        return obj;
    });
    return rows;
}
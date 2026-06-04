import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
    keyFile: "./backend/credentials.json",
    scopes: [
        "https://www.googleapis.com/auth/spreadsheets"
    ]
});

const sheets = google.sheets({
    version: "v4",
    auth
});

const SPREADSHEET_ID =
    "17zhXMEve87Semh7SphFPAgIBhO04dgS_apaU-l9iFoE";

async function getSheet(sheetName) {

    const response =
        await sheets
            .spreadsheets
            .values
            .get({

                spreadsheetId:
                    SPREADSHEET_ID,

                range:
                    `${sheetName}!A:B`

            });

    return (
        response.data.values || []
    );

}

async function appendRow(
    sheetName,
    values
) {

    await sheets
        .spreadsheets
        .values
        .append({

            spreadsheetId:
                SPREADSHEET_ID,

            range:
                `${sheetName}!A:B`,

            valueInputOption:
                "RAW",

            requestBody: {
                values: [values]
            }

        });

}

// export async function addSale(
//     values
// ) {

//     await sheets
//         .spreadsheets
//         .values
//         .append({

//             spreadsheetId:
//                 SPREADSHEET_ID,

//             range:
//                 "Sales!A:F",

//             valueInputOption:
//                 "RAW",

//             requestBody: {
//                 values
//             }

//         });

// }

export async function getProducts() {

    return await getSheet(
        "Products"
    );

}

export async function addProduct(
    id,
    name
) {

    await appendRow(
        "Products",
        [
            id,
            name
        ]
    );

}

export async function getBuyers() {

    return await getSheet(
        "Buyers"
    );

}

export async function addBuyer(
    id,
    name
) {

    await appendRow(
        "Buyers",
        [
            id,
            name
        ]
    );

}

export async function getTrucks() {

    return await getSheet(
        "Trucks"
    );

}

export async function addTruck(
    id,
    number
) {

    await appendRow(
        "Trucks",
        [
            id,
            number
        ]
    );

}

export async function addSale(
    values
) {

    await sheets
        .spreadsheets
        .values
        .append({

            spreadsheetId:
                SPREADSHEET_ID,

            range:
                "Sales!A:G",

            valueInputOption:
                "RAW",

            requestBody: {
                values
            }

        });
console.log(
        "WRITING TO SHEET:",
        values
    );

}

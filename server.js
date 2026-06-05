// import express from "express";
// import cors from "cors";
// import fs from "fs";
// import {
//     getProducts,
//     addProduct
// }
// from "./googleSheets.js";
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Backend running");
// });

// app.post("/api/login", (req, res) => {
//     console.log(req.body);
//     const { password } = req.body;

//     if (password === "admin123") {

//         return res.json({
//             success: true
//         });

//     }

//     return res.status(401).json({
//         success: false
//     });

// });

// // const response = await fetch(
// //     "http://localhost:3001/api/login",
// //     {
// //         method: "POST",
// //         headers: {
// //             "Content-Type":
// //                 "application/json"
// //         },
// //         body: JSON.stringify({
// //             password
// //         })
// //     }
// // );

// app.get(
//     "/api/products",
//     async (
//         req,
//         res
//     ) => {

//         const rows =
//             await getProducts();

//         const products =
//             rows
//                 .slice(1)
//                 .map(row => ({
//                     id: row[0],
//                     name: row[1]
//                 }));

//         res.json(products);

//     }
// );

// app.post(
//     "/api/products",
//     async (
//         req,
//         res
//     ) => {

//         const { name } =
//             req.body;

//         const id =
//             Date.now();

//         await addProduct(
//             id,
//             name
//         );

//         res.json({
//             id,
//             name
//         });

//     }
// );

// app.delete(
//     "/api/products/:id",
//     (req, res) => {

//         const id =
//             Number(req.params.id);

//         const products =
//             JSON.parse(
//                 fs.readFileSync(
//                     "./backend/data/products.json",
//                     "utf8"
//                 )
//             );

//         const updated =
//             products.filter(
//                 product =>
//                     product.id !== id
//             );

//         fs.writeFileSync(
//             "./backend/data/products.json",
//             JSON.stringify(
//                 updated,
//                 null,
//                 2
//             )
//         );

//         res.json({
//             success: true
//         });

//     }
// );

// app.get(
//     "/api/buyers",
//     (req, res) => {

//         const buyers =
//             JSON.parse(
//                 fs.readFileSync(
//                     "./backend/data/buyers.json",
//                     "utf8"
//                 )
//             );

//         res.json(buyers);

//     }
// );

// app.post(
//     "/api/buyers",
//     (req, res) => {

//         const { name } = req.body;

//         const buyers =
//             JSON.parse(
//                 fs.readFileSync(
//                     "./backend/data/buyers.json",
//                     "utf8"
//                 )
//             );

//         const newBuyer = {
//             id: Date.now(),
//             name
//         };

//         buyers.push(newBuyer);

//         fs.writeFileSync(
//             "./backend/data/buyers.json",
//             JSON.stringify(
//                 buyers,
//                 null,
//                 2
//             )
//         );

//         res.json(newBuyer);

//     }
// );

// app.delete(
//     "/api/buyers/:id",
//     (req, res) => {

//         const id =
//             Number(req.params.id);

//         const buyers =
//             JSON.parse(
//                 fs.readFileSync(
//                     "./backend/data/buyers.json",
//                     "utf8"
//                 )
//             );

//         const updated =
//             buyers.filter(
//                 buyer =>
//                     buyer.id !== id
//             );

//         fs.writeFileSync(
//             "./backend/data/buyers.json",
//             JSON.stringify(
//                 updated,
//                 null,
//                 2
//             )
//         );

//         res.json({
//             success: true
//         });

//     }
// );

// const PORT = 3001;

// app.listen(PORT, () => {
//     console.log(
//         `Server running on port ${PORT}`
//     );
// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import {
    getProducts,
    addProduct,
    getBuyers,
    addBuyer,
    addSale
}
from "./googlesheets.js";

const app = express();

app.use(
    cors({
        origin: [
            "https://sales-form-frontend-alpha.vercel.app"
        ]
    })
);
app.use(express.json());

app.get("/", (req, res) => {

    res.send(
        "Backend running"
    );

});

app.post(
    "/api/login",
    (req, res) => {

        const { password } =
            req.body;

        if (
            password ===
            "admin123"
        ) {

            return res.json({
                success: true
            });

        }

        return res
            .status(401)
            .json({
                success: false
            });

    }
);

app.get(
    "/api/products",
    async (req, res) => {

        try {

            const rows =
                await getProducts();

            const products =
                rows
                    .slice(1)
                    .map(row => ({
                        id: row[0],
                        name: row[1]
                    }));

            res.json(products);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error:
                    "Failed to load products"
            });

        }

    }
);

app.post(
    "/api/products",
    async (req, res) => {

        try {

            const { name } =
                req.body;

            const id =
                Date.now();

            await addProduct(
                id,
                name
            );

            res.json({
                id,
                name
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error:
                    "Failed to add product"
            });

        }

    }
);

app.get(
    "/api/buyers",
    async (req, res) => {

        try {

            const rows =
                await getBuyers();

            const buyers =
                rows
                    .slice(1)
                    .map(row => ({
                        id: row[0],
                        name: row[1]
                    }));

            res.json(buyers);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error:
                    "Failed to load buyers"
            });

        }

    }
);

app.post(
    "/api/buyers",
    async (req, res) => {

        try {

            const { name } =
                req.body;

            const id =
                Date.now();

            await addBuyer(
                id,
                name
            );

            res.json({
                id,
                name
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error:
                    "Failed to add buyer"
            });

        }

    }
);

app.post(
    "/api/sales",
    async (req, res) => {

        try {

            const sale =
                req.body;

            const rows =
    sale.items.map(
        item => [
            sale.salesid,
            sale.date,

            sale.buyerName,
            sale.saleType,
            item.product,

            item.quantity,

            item.price,

            sale.remarks || ""

        ]
    );

            await addSale(
                rows
            );

            res.json({
                success: true
            });

        } catch (error) {

    console.error(
        "SALES ERROR:"
    );

    console.error(
        error
    );

    res.status(500).json({
        success: false,
        error: error.message
    });

}
        console.log(
    "SALE RECEIVED:",
    req.body
);

    }
    
);


const PORT = process.env.PORT || 3001;

app.listen(
    PORT,"0.0.0.0",
    () => {

        console.log(
            `Server running on port ${PORT}`
        );

    }
);
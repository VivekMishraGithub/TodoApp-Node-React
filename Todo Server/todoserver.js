const { Console } = require('console');
const express = require('express');
const cors = require("cors");
const path = require('path');
const fs = require('fs');
const http = require('http');
const { Pool } = require("pg");
const port = process.env.PORT || 5000;
const app = express();
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todoapp",
    password: "postgres",
    port: 5432,
});

// pool.query("SELECT NOW()", (err, result) => {
//     if (err) {
//         console.error("Database connection failed:", err.message);
//     } else {
//         console.log("Database connected successfully!");
//         console.log(result.rows[0]);
//     }
// });

// pool.query("SELECT * FROM todos", (err, result) => {
//     if (err) {
//         console.log(err.message);
//     }
//     else {
//         console.log(result.rows);
//     }
// });
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.post("/todos", (req, res) => {
    console.log("POST /todos called");
    console.log(req.body)
    const { title, description } = req.body;

    pool.query(
        `INSERT INTO todos(title, description)
        VALUES($1, $2)
        RETURNING *`,
        [title, description],
        (err, result) => {
            if (err) {
                return res.sendStatus(500).json({
                    message: err.message
                });
            }

            res.status(201).json(result.rows[0]);
        }
    );

    console.log(title);
    console.log(description);
});

app.get("/todos", (req, res) => {

    pool.query(
        `SELECT * FROM todos`,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(200).json(result.rows);
        }
    );

});

app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    pool.query("DELETE FROM todos WHERE id = $1", 
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            }

            if (result.rowCount === 0) {
                return res.status(404).json({
                    message: "Todo not found"
                });
            }

            res.status(200).json({
                message: "Todo deleted successfully"
            });
        }
    )
})

// app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'Todo-List', 'build', 'index.html'));
// });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
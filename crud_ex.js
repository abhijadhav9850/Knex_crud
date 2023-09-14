const express = require("express");
const app = express()
const port = 3000;

const pg = require('knex')({
    client: 'pg',
    connection: {
        connectionString: "postgres://crud_knex_user:xsNxWW3Xphn7tguONGZoOzyXkSWL1S4m@dpg-ck1crufdorps73d3ubn0-a.oregon-postgres.render.com/crud_knex",
        host: "dpg-ck1crufdorps73d3ubn0-a.oregon-postgres.render.com",
        port: "5432",
        user: "crud_knex_user",
        database: "crud_knex",
        password: "xsNxWW3Xphn7tguONGZoOzyXkSWL1S4m",
        ssl: true,
    }
});


app.get("/showdata", (req, res) => {
    setTimeout(async () => {
        let a = await pg.select('id', 'Name', 'City', 'Gender')
            .from('student')
        res.send(a)
    }, 5000);
})

app.get("/adddata/:id/:Name/:City/:Gender", (req, res) => {
    setTimeout(async () => {
        let result = await pg('student').insert([
            {
                id: req.params.id,
                Name: req.params.Name,
                City: req.params.City,
                Gender: req.params.Gender
            }
        ])
        res.send(result)
    }, 5000);
})

app.get("/update/:Name/:newName", (req, res) => {
    setTimeout(async () => {
        let result = await pg('student')
            .where("Name", "=", `${req.params.Name}`)
            .update({ Name: `${req.params.newName}` });
        res.json(result)
    }, 5000);
})

app.get("/del/:Name", (req, res) => {
    setTimeout(async () => {
        let result = await pg('student')
            .where("Name", `${req.params.Name}`)
            .del("id");
        res.json(result)
    }, 5000);
})

app.listen(port, () => {
    console.log(`using port - http://localhost:${port}`);
})

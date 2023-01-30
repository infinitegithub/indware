const { MongoClient } = require("mongodb");
const Express = require("express");
const Cors = require("cors");
const bodyParser = require('body-parser');

const client = new MongoClient("mongodb+srv://infinitegithub:Hinata1*hyuga@cluster0.i1lmn78.mongodb.net/?retryWrites=true&w=majority");
const server = Express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(Cors());

var collection;

server.get("/search", async (request, response) => {
    try {
        let result = await collection.aggregate([/* 
            {
                "$search": {
                    "autocomplete": {
                        "query": `${request.query.term}`,
                        "path": "string",
                        "fuzzy": {
                            "maxEdits": 2
                        }
                    }
                }
            }
         */
            {
                '$search': {
                    'index': 'default',
                    'text': {
                        'query': `${request.query.term}`,
                        'path': {
                            'wildcard': '*'
                        }
                    }
                }
            }
        ]).toArray();
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
})

server.listen("3000", async () => {
    try {
        await client.connect();
        collection = client.db("indigp").collection("stores");
    } catch (e) {
        console.log(e)
    }
});

import {db} from "../db";
import * as bodyParser from "body-parser";

export default function (app) {

    app.use(bodyParser.json());

    app.get('/api/todo/reset', (req, res) => {
        db.initWithSeed().then(data => res.end(JSON.stringify(data)));
    });

    app.get('/api/todo/:id?', (req, res) => {
        db.get(req.params.id).then(data => res.end(JSON.stringify(data)));
    });

    app.post('/api/todo/:id?', (req, res) => {
        db.post({
            id: req.params.id,
            text: req.body.text,
            checked: req.body.checked
        }).then(data => res.end(JSON.stringify(data)));
    });
    app.delete('/api/todo/:id?', (req, res) => {
        db.remove(req.params.id).then(data => res.end(JSON.stringify(data)));
    });
}

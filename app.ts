import * as express from 'express';
import * as bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

let currentId = 0;
let todoList = [
    {
        id: currentId++,
        text: "example",
        checked: false
    },
    {
        id: currentId++,
        text: "example2",
        checked: true
    }
];

app.get('/api/todo/:id?', (req, res) => {
    res.end(JSON.stringify(req.params.id ? todoList[req.params.id] : todoList));
});

app.post('/api/todo/:id?', (req, res) => {
    const todo: any = req.params.id ? todoList.find(todo => todo.id === Number(req.params.id)) : {id: currentId++};
    todo.text = req.body.text;
    todo.checked = req.body.checked;
    if (!req.params.id) {
        todoList.push(todo);
    }
    res.end(JSON.stringify(todo));
});
app.delete('/api/todo/:id?', (req, res) => {
    todoList = req.params.id ? todoList.filter(it => it.id !== Number(req.params.id)) : [];
    currentId = req.params.id ? currentId - 1 : 0;
    res.end(JSON.stringify(todoList));
});

app.listen(4445);
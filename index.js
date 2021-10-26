const express = require('express');
const app = express();
app.use(express.json());
var tasks = [];
var id = 0;

const cors =(req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader('Content-Type', 'text/plain');
  next();
}
app.use(cors);
app.post("/tasks", (req, res) => {
  if (req.body.description !== undefined) {
    var taskItem = { ...req.body, id: id++ };
    tasks.push(taskItem);
    res.status(201).send('The task successfully added');
  }
  else {
    res.sendStatus(400);
  }
})
app.get("/tasks", (req, res) => {
  res.send(tasks);
})
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  if (id === undefined || id === null) res.status(400).send("Id is required.");
  if (tasks.length !== 0) {
    var result = null;
    tasks.forEach(item => {
      if (id.toString() === item.id.toString()) {
        result = item;
      }
    })
    result === null ? res.sendStatus(404) : res.send(result);
  }
  else {
    res.sendStatus(404);
  }
})

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  if (id === undefined || id === null) res.status(400).send("Id is required.");
  if (tasks.length !== 0) {
    var result = null;
    tasks.forEach(item => {
      if (id.toString() === item.id.toString()) {
        item = { ...item, ...req.body };
        tasks.splice(id, 1, item);
        result = item;
      }
    })
    result === null ? res.sendStatus(404) : res.send(result);
  }
  else {
    res.sendStatus(404);
  }
})

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  if (id === undefined || id === null) res.status(400).send("Id is required.");
  if (tasks.length !== 0) {
    var result = null;
    tasks.forEach(item => {
      if (id.toString() === item.id.toString()) {
        result = item;
        tasks.splice(id, 1);
      }
    })
    result === null ? res.sendStatus(404) : res.status(202).send(`Task ${id} successfully deleted!`);
  }
  else {
    res.sendStatus(404);
  }
})

app.listen(3000, () => {
  console.log(`Start server at port 3000.`);
});
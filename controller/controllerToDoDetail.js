const pool = require("../dbConnetion");

const getAllToDos = async (req, res) => {
  await pool.query("SELECT * FROM todos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const createTodo = async (request, response) => {
  const { id, task, completed } = request.body;

  await pool.query(
    "INSERT INTO todos (id, task, completed) VALUES ($1, $2, $3)",
    [id, task, completed],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const updateToDo = async (request, response) => {
  const { id, task, completed } = request.body;

  await pool.query(
    "UPDATE todos SET task = $1, completed = $2 WHERE id = $3",
    [ task, completed, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const completeToDo = async (request, response) => {
  let { id, completed } = request.body;

  if(completed){
    completed = false;
  }
  else{
    completed = true;
  }

  await pool.query(
    "UPDATE todos SET completed = $1 WHERE id = $2",
    [completed, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const deleteToDO = async (request, response) => {
  const id = request.body.id;

  await pool.query(
    "DELETE FROM todos WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json({ message: "Success" });
    }
  );
};

module.exports = { getAllToDos, createTodo, updateToDo, deleteToDO, completeToDo };

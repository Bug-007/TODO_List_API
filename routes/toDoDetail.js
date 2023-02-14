const { Router } = require("express");
const controller = require("../controller/controllerToDoDetail");
const router = Router();

router.get("/getall", controller.getAllToDos);
router.post("/create", controller.createTodo);
router.put("/update", controller.updateToDo);
router.put("/update/completed", controller.completeToDo);
router.delete("/delete", controller.deleteToDO);

module.exports = router;

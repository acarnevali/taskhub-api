import { Router } from "express";
//users
import { UsersRepository } from "../../../../users/repositories/usersRespository.js";
import { CreateUserService } from "../../../../users/service/createUserService.js";
import { AuthService } from "../../../../users/service/authService.js";
import { CreateUserController } from "../../../../users/controllers/createUsersController.js";
import { AuthController } from "../../../../users/controllers/authController.js";
import { DeleteUserService } from "../../../../users/service/deleteUserService.js";

//tasks
import { TasksRepository } from "../../../../tasks/repositories/tasksRepository.js"; 
import { CreateTaskService } from "../../../../tasks/services/createTaskService.js";
import { CreateTaskController } from "../../../../tasks/controller/createTaskController.js";
import { UpdateUserService } from "../../../../users/service/updateUserService.js";
import { UpdateUserController } from "../../../../users/controllers/updateUserController.js";
import { ListUserTasksService } from "../../../../tasks/services/listUserTasksService.js";
import { ListUserTasksController } from "../../../../tasks/controller/listUserTasksController.js";
import { UpdateTaskController } from "../../../../tasks/controller/updateTaskController.js";
import { UpdateTaskService } from "../../../../tasks/services/updateTaskService.js";
import { DeleteTaskService } from "../../../../tasks/services/deleteTaskService.js";
import { DeleteTaskController } from "../../../../tasks/controller/deleteTaskController.js";

import { authMiddleware } from "../../../../../middlewares/authMiddleware.js"; 
import { DeleteUserController } from "../../../../users/controllers/deleteUserController.js";

const routes = Router();

//users
const usersRepository = new UsersRepository();
const createUserService = new CreateUserService(usersRepository);
const authService = new AuthService(usersRepository);
const createUserController = new CreateUserController(createUserService);
const authController = new AuthController(authService);
const updateUserService = new UpdateUserService(usersRepository);
const updateUserController = new UpdateUserController(updateUserService);
const deleteUserService = new DeleteUserService(usersRepository);
const deleteUserController = new DeleteUserController(deleteUserService);

//tasks
const tasksRepository = new TasksRepository();
const createTaskService = new CreateTaskService(tasksRepository);
const createTaskController = new CreateTaskController(createTaskService);
const listUserTasksService = new ListUserTasksService(tasksRepository);
const listUserTasksController = new ListUserTasksController(listUserTasksService);
const updateTaskService = new UpdateTaskService(tasksRepository);
const updateTaskController = new UpdateTaskController(updateTaskService);
const deleteTaskService = new DeleteTaskService(tasksRepository);
const deleteTaskController = new DeleteTaskController(deleteTaskService);

//users
routes.post("/users", createUserController.handle);
routes.post("/auth/login", authController.handle);

/**
 * @openapi
 * /me/profile:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retorna ID do usuário logado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Sucesso
 */

routes.get("/me/profile", authMiddleware, (req, res) => {
  return res.json({ message: `Seu ID de usuário é ${req.user.id}` });
});
routes.put("/me", authMiddleware, updateUserController.handle);
routes.delete("/me", authMiddleware, deleteUserController.handle);

//tasks
routes.post("/tasks", authMiddleware, createTaskController.handle);
routes.get("/list", authMiddleware, listUserTasksController.handle);
routes.put("/tasks/:id", authMiddleware, updateTaskController.handle);
routes.delete("/tasks/:id", authMiddleware, deleteTaskController.handle);

export { routes };
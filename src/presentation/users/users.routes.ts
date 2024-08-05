import { Router } from "express";
import { UserController } from "./users.controller";
import { UserServices } from "../services/user.service";

export class UsersRoutes{
    static get routes():Router{
        const routes =  Router();

        const service =  new UserServices();
        const controller  = new UserController(service);

        routes.post("/register", controller.create);
        routes.get("/", controller.getAll );
        routes.get("/:id", controller.getUserBiId);
        routes.patch("/:id", controller.update);
        routes.delete("/:id", controller.delete);
        return routes;
    };
};
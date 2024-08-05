import { Router } from "express";
import { UserServices } from "../services/user.service";
import { RepairsController } from "./repairs.controller";
import { RepairsServices } from "../services/repair.service";

export class RepairsRoutes{
    static get routes():Router{
        const routes =  Router();

        const serviceUser = new UserServices()

        const service =  new RepairsServices(serviceUser);

        const contoller =  new RepairsController(service);

        routes.post("/", contoller.create);
        routes.get("/", contoller.getAll);
        routes.get("/:id", contoller.getById);
        routes.patch("/:id", contoller.update);
        routes.delete("/:id", contoller.delete);
        return routes;
    };
};
import { Request, Response } from "express";
import { UserServices } from "../services/user.service";
import { CustomError, UserCreateUserDto } from "../../domain";

export class UserController{
    constructor(
        private readonly userServices : UserServices
    ){};

    private handleError=(error:unknown, res:Response)=>{
        if(error instanceof CustomError) return res.status(error.statusCode).json({message :  error.message});

        return res.status(500).json({message : 'Something went very wrong! 🧨'});
    };


    create = (req:Request, res:Response)=>{
        const [error, userDto] = UserCreateUserDto.create(req.body);

        if(error) return res.status(400).json(error);
        
        this.userServices.create(userDto!)
            .then(user=> res.status(202).json(user))
            .catch(error => this.handleError(error, res))
        
    };  

    getAll = (_:Request, res:Response)=>{
        this.userServices.getAll()
            .then(users=> res.status(200).json(users))
            .catch(error => this.handleError(error, res));
    };

    getUserBiId = (req:Request, res:Response)=>{
        const {id} = req.params;

        if(isNaN(+id)) res.status(404).json({message : "Id type number"});

        this.userServices.getUserById(+id)
            .then(user=> res.status(200).json(user))
            .catch(error => this.handleError(error, res));
    };

    update=(req:Request, res:Response)=>{
        const {id} = req.params;

        if(isNaN(+id)) res.status(404).json({message : "Id type number"});

        const [error, userDto] = UserCreateUserDto.create(req.body);

        if(error) return res.status(400).json(error);

        this.userServices.update(+id, userDto!)
            .then(updateUser=> res.status(202).json(updateUser))
            .catch(error => this.handleError(error, res))

    };

    delete =(req:Request, res:Response)=>{
        const {id} = req.params;

        if(isNaN(+id)) res.status(404).json({message : "Id type number"});

        this.userServices.dalete(+id)
            .then(deleteUser=> res.status(202).json(deleteUser))
            .catch(error => this.handleError(error, res));
    };

};
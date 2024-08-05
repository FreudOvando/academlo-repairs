import { Request, Response } from "express";
import { RepairsServices } from "../services/repair.service";
import { CustomError, RepairsCreateDto } from "../../domain";


export class RepairsController {
    constructor(
        private readonly repairsServices : RepairsServices
    ){};

    private handleError=(error:unknown, res:Response)=>{
        if(error instanceof CustomError) return res.status(error.statusCode).json({message :  error.message});

        return res.status(500).json({message : 'Something went very wrong! 🧨'});
    };


    create =(req:Request, res : Response)=>{
        const [error, repairDto] = RepairsCreateDto.create(req.body);  

        if(error) return res.status(400).json(error);

        this.repairsServices.create(repairDto!)
            .then(repairs => res.status(202).json(repairs))
            .catch(error => this.handleError(error, res));
    };
    
    getAll =(_:Request, res:Response)=>{
        this.repairsServices.getAll()
            .then(repairs => res.status(200).json(repairs))
            .catch(error => this.handleError(error, res));
    };  

    getById =(req:Request, res:Response)=>{

        const {id} = req.params;

        if(isNaN(+id)) return res.status(422).json({message :  "El id debe ser numero"});

        this.repairsServices.getById(+id)
            .then(repair=> res.status(200).json(repair))
            .catch(erro=> this.handleError(erro, res))
    };
    update =(req:Request, res:Response)=>{
        const {id} = req.params;

        const [error, repairDto] = RepairsCreateDto.create(req.body); 


        if(isNaN(+id)) return res.status(422).json({message :  "El id debe ser numero"});

        if(error) return res.status(400).json(error);

        this.repairsServices.update(+id, repairDto!)
            .then(repair => res.status(202).json(repair))
            .catch(error => this.handleError(error, res))
    };

    delete =(req:Request, res:Response)=>{
        const {id} = req.params;

        if(isNaN(+id)) return res.status(422).json({message :  "El id debe ser numero"});

        this.repairsServices.delete(+id)
            .then(deleteRepair => res.status(202).json(deleteRepair))
            .catch(error => this.handleError(error, res));
    };
};
import { Repairs } from "../../data/postgres/models/repairs.model";
import { CustomError, RepairsCreateDto } from "../../domain";
import { UserServices } from "./user.service";

enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED" 
};

export class RepairsServices{

    constructor(
        private readonly userServices :  UserServices,
    ){};

    async create(repairsData:RepairsCreateDto){
        
        const userPromise = this.userServices.getUserById(repairsData.user_id);
        const motorPromise = this.name(repairsData.motor_number);

        const [_, motor] = await Promise.all([userPromise, motorPromise]);

        const repairs = new Repairs();

        repairs.user_id =  repairsData.user_id;
        repairs.date =  repairsData.date;
        repairs.description =  repairsData.description;
        repairs.motor_number =  motor;

        return await repairs.save();

    };

    async getAll(){
        const repairs =  await Repairs.find({
            where : [{status:Status.COMPLETED}, {status: Status.PENDING}]
        });

        if(!repairs) throw CustomError.badRequest("Repairs no exist");

        return repairs;
    };

    async getById(id:number){
        const repair =  await Repairs.findOne({
            where : [{id, status:Status.COMPLETED}, {id, status: Status.PENDING}]
        });

        if(!repair) throw CustomError.badRequest("Repair no exist");

        return repair;
    };

    async update(id:number, repairData:RepairsCreateDto){
        const userPromise = this.userServices.getUserById(repairData.user_id);
        const motorPromise = this.name(repairData.motor_number);
        const repairPromise =  this.getById(id);

        const [_, motor, repair] = await Promise.all([userPromise, motorPromise, repairPromise]);


        repair.user_id =  repairData.user_id;
        repair.date =  repairData.date;
        repair.description =  repairData.description;
        repair.motor_number =  motor;

        return await repair.save();

    };

    async delete(id:number){
        const repair =  await this.getById(id);

        repair.status = Status.CANCELLED;
        
        return await repair.save()
    };

    async name(name:string){
        const motor = await Repairs.findOne({
            where : {motor_number : name},
        });

        if(motor) throw CustomError.badRequest("motor exists");

        return name;
    };


};

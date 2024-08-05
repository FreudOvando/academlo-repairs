import { User } from "../../data/postgres/models/users.model";
import { CustomError, UserCreateUserDto } from "../../domain";

enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export class UserServices{
    constructor(){};

    async create(userData:UserCreateUserDto){
        
        const email = await this.emailExit(userData.email);

        const user = new User();

        user.name =  userData.name;
        user.email =  email!;
        user.password =  userData.password;

        return await user.save();
    };

    async getAll(){
        const users = await User.find({
            where : {status : Status.ACTIVE}
        });

        if(!users) throw CustomError.badRequest("Not exist users");

        return users;
    };

    async getUserById(id:number){
        const user = await User.findOne({
            where : {id, status : Status.ACTIVE}
        });

        if(!user) throw CustomError.badRequest("Not exist usser");

        return user;
    };

    async update(id:number, userData:UserCreateUserDto){
        const user =  await this.getUserById(id);

        user.name = userData.name,
        user.email = userData.email;
        user.password =  userData.password;

        return await user.save();
    };

    async dalete(id:number){
        const user =  await this.getUserById(id);

        user.status =  Status.INACTIVE;

        return await user.save();
    };

    async emailExit(email:string){
        const emailExit =  await User.findOne({
            where : {email,status :Status.ACTIVE},
        });

        if(emailExit)  throw CustomError.badRequest("Eamil exists");

        return email;
    };
};
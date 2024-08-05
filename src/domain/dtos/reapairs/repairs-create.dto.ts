export class RepairsCreateDto {
    constructor(
        public readonly user_id : number,
        public readonly date : string,
        public readonly motor_number : string,
        public readonly  description : string,
    ){};

    static create(object : {[key:string] : any}): [string?, RepairsCreateDto?]{
        const {user_id, date, motor_number, description} = object;

        if(!user_id) return ["Missing user_id", undefined];
        if(isNaN(+user_id)) return ["el Id debes ser un numero", undefined];
        if(!date) return ["Missing date", undefined];
        if(!motor_number) return ["Missing motor_number", undefined];
        if(!description) return ["Missing description", undefined];
        
        return [ undefined, new RepairsCreateDto( user_id, date, motor_number, description)];
    };
};
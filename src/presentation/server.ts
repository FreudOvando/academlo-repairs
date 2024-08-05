import express,{ Router } from "express"

interface Option {
    port :  number;
    router :  Router;
};


export class Server{
    public readonly app = express();
    private readonly port :  number;
    private readonly routes : Router;

    constructor(option:Option){
        this.port = option.port;
        this.routes =  option.router;
    };

    async start(){
        // middleware 
        this.app.use(express.json()),
        this.app.use(express.urlencoded({extended :  true})),

        this.app.use(this.routes);

        this.app.listen(this.port, ()=> {
            console.log(`Server is runningon port ${this.port}`);
        });

    };

};
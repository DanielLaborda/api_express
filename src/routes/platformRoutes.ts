import { Request, Response, Router } from 'express';

import Platform from '../models/platform';

class PlatformtRouter {

    //Rutas de platform
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getPlatforms(req: Request, res: Response):Promise<void> {
        const platforms =  await Platform.find();
        res.json(platforms);

    }

    public async getPlatform(req: Request, res: Response):Promise<void> {
        await Platform.findOne({_id: req.params.id}, function(error:any, doc:any){
            if(error) {
                res.json('This ID is incorrect');
            } else {
                res.json(doc);
            }
        });
        
    }

    public async createPlatform(req:Request, res: Response):Promise<void> {
        const { icon, title } = req.body;
        console.log(icon);
        const newPlatform = new Platform({icon: icon, title: title});
        console.log(newPlatform);
        await newPlatform.save(); 
        res.json({data: newPlatform});      
    }

    public async updatePlatform(req: Request, res: Response):Promise<void> { 
        let errorMessage;       
        let createDateNew ;
    

        if(req.body.createAT){
            if(isNaN(Date.parse(req.body.createAT))){
                errorMessage ='Create date error';
            } else {
                createDateNew = new Date(req.body.createAT);
            }
        }
        if (errorMessage){
            res.json({error: errorMessage}); 
        } else {
            req.body.updateAT =Date.now();
            if( createDateNew ) {
                req.body.createAT = createDateNew;
            }
        }
        console.log(req.body);
        const newPlatform= await Platform.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        res.json(newPlatform);
    }

    public async deletePlatform(req: Request, res: Response):Promise<void> {
        await Platform.findOneAndDelete({_id: req.params.id});
        res.json('se borro con exito');    
    }

    routes() {
        this.router.get('/', this.getPlatforms);
        this.router.get('/:id', this.getPlatform);
        this.router.post('/', this.createPlatform);
        this.router.put('/:id', this.updatePlatform);
        this.router.delete('/:id', this.deletePlatform);
    }
}

const platformRoutes = new PlatformtRouter();
platformRoutes.routes();


export default platformRoutes.router;
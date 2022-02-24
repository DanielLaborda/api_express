import { Request, Response, Router } from "express";

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
        const platform = await Platform.findOne({_id: req.params.id});
        if(platform==undefined){
            res.json('Ese Dato no existe')
        }else {
            res.json(platform);
        }
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
        let updateDateNew, createDateNew, newData ;
        if(req.body.updateAT){
            updateDateNew = new Date(req.body.updateAT);
        } 
        if(req.body.createAt){
            createDateNew = new Date(req.body.createAt);
        } 
        if(updateDateNew  && createDateNew) {
            newData = {
                icon: req.body.icon,
                title: req.body.title,
                createAt: createDateNew,
                updateAT: updateDateNew
            }
        }  else if (createDateNew) {
            newData = {
                icon: req.body.icon,
                title: req.body.title,
                createAt: createDateNew
            }
        } else if(updateDateNew){
            newData = {
                icon: req.body.icon,
                title: req.body.title,
                updateAT: updateDateNew
            }
        } else {
            newData = req.body;
        }

        const newPlatform= await Platform.findOneAndUpdate({_id: req.params.id}, newData, {new: true});
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
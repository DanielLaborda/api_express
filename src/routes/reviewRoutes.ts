import { Request, Response, Router } from "express";

import Review from "../models/review";

class ReviewRouter {
    //Rutas de Reviews
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getReviews(req: Request, res: Response):Promise<void> {
        const reviews =  await Review.find().populate('platform');
        res.json(reviews);

    }

    public async getReview(req: Request, res: Response):Promise<void> {
        const getReview = await Review.findOne({_id: req.params.id}).populate('platform');
        if(getReview==undefined){
            res.json('Ese Dato no existe')
        }else {
            res.json(getReview);
        }
    }

    public async createReview(req:Request, res: Response):Promise<void> {
        const newReview = new Review(req.body);
        await newReview.save(); 
        res.json({data: newReview});      
    }

    public async updateReview(req: Request, res: Response):Promise<void> {        
        const newReview= await Review.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        res.json(newReview);    
    }

    public async deleteReview(req: Request, res: Response):Promise<void> {
        await Review.findOneAndDelete({_id: req.params.id});
        res.json('se borro con exito');    
    }

    routes() {
        this.router.get('/', this.getReviews);
        this.router.get('/:id', this.getReview);
        this.router.post('/', this.createReview);
        this.router.put('/:id', this.updateReview);
        this.router.delete('/:id', this.deleteReview);
    }
}

const reviewRoutes = new ReviewRouter();
reviewRoutes.routes();


export default reviewRoutes.router;
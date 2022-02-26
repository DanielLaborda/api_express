import { Request, Response, Router } from "express";
import { isNumber } from "util";

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
        await Review.findOne({_id: req.params.id}, function(error:any,doc:any) {
            if (error) {
                res.json('This ID is incorrect');
            } else {
                res.json(doc);
            }
        });
    }

    public async createReview(req:Request, res: Response):Promise<void> {
        let dataInvalid = false;
        if(req.body.score){
            if (!isNumber(req.body.score) || req.body.score<-1 || req.body.score>6 ){
                dataInvalid = true;
            }
        }

        if(!dataInvalid){
            const newReview = new Review(req.body);
            await newReview.save();
            res.json({data: newReview}); 
        } else {
            res.json("Data not valid"); 
        }
    }

    public async updateReview(req: Request, res: Response):Promise<void> {        
        const newReview = await Review.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
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
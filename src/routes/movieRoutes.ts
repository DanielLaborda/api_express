import { Request, Response, Router } from "express";

import Movie from '../models/movie';

class MovieRouter {
    //Rutas de Reviews
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getMovies(req: Request, res: Response):Promise<void> {
        const movies =  await Movie.find().populate('platform reviews');
        res.json(movies);
    }

    public async getMovie(req: Request, res: Response):Promise<void> {
        const getMovie = await Movie.findOne({_id: req.params.id}).populate('platform reviews');
        if(getMovie==undefined){
            res.json('Ese Dato no existe')
        }else {
            res.json(getMovie);
        }
    }

    public async createMovie(req:Request, res: Response):Promise<void> {
        const newMovie = new Movie(req.body);
        await newMovie.save(); 
        res.json({data: newMovie});           
    }

    public async updateMovie(req:Request, res: Response):Promise<void> {
        const newMovie= await Movie.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        res.json(newMovie);
    }

    public async deleteMovie(req: Request, res: Response):Promise<void> {
        await Movie.findOneAndDelete({_id: req.params.id});
        res.json('se borro con exito');    
    }

    routes() {
        this.router.get('/', this.getMovies);
        this.router.get('/:id', this.getMovie);
        this.router.post('/', this.createMovie);
        this.router.put('/:id', this.updateMovie);
        this.router.delete('/:id', this.deleteMovie);
    }
}
const movieRoutes = new MovieRouter();
movieRoutes.routes();


export default movieRoutes.router;
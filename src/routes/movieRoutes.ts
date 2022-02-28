import { Request, Response, Router } from 'express';
import axios from 'axios';

import Movie from '../models/movie';
import Review from '../models/review';

class MovieRouter {
    //Rutas de movies
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getMovies(req: Request, res: Response):Promise<void> {
        const options = {
            query: {},
            sort: { date: -1 },
            populate: 'account',
            limit: 5
        };
        const movies = await Movie.paginate(options);
        res.json(movies);
    }


    public async getMovie(req: Request, res: Response):Promise <void> {
        const reviews:any[] = [];
        // consultamos la pelicula
        const movie = await Movie.findOne({_id: req.params.id}).populate('reviews');
        if(movie !== null) {
            movie.reviews.map((aux:any) =>{
                reviews.push({
                    '_id':aux._id.toString(),
                    'platform':aux.platform.toString(),
                    'author': aux.author,
                    'body': aux.body,
                    'score' : aux.score,
                    'createAT': aux.createAT,
                    'updateAT': aux.updateAT
                });
            });
            //ordenamos las reviews
            reviews.sort((n1,n2) =>{
                if (n1.platform > n2.platform) {
                    return 1;
                }
                if (n1.platform < n2.platform) {
                    return -1;
                }   
                return 0;
            });
            // mostramos resultados
            const result = {
                _id: movie._id,
                slug: movie.slug,
                image: movie.image,
                title: movie.title,
                director: movie.director,
                platform: movie.platform,
                score: movie.score,
                createAt: movie.createAt,
                updateAT: movie.updateAT,
                reviews: reviews
            };
            res.json(result);
        } else {
            res.json('Un error ocurrio');
        }
        
    }


    public async createMovie(req:Request, res: Response):Promise<void> {
        const title = req.body.title;
        let existMovieID = '';

        //Consultamos la lista de pelis
        const url = 'http://localhost:7000/api/movies/';
        const movies = await axios.get(url).then(response => {
            return response.data;
                  
        }).catch(error => {
            console.log('Error en la api' + error);    
            return '';
        });
        movies.map((element:any) => {
            if(title === element.title ) {
                existMovieID = element._id;
            }
        });

        // creamos o modificamos
        if(!existMovieID) {
            const newMovie = new Movie(req.body);
            await newMovie.save(); 
            res.json({data: newMovie});       
        } else {  
            
            console.log(existMovieID);
            const updateData: {[key: string]: any} = {'title': req.body.title};
            if(req.body.image) {
                updateData['image'] = req.body.image;
            }
            if(req.body.director) {
                updateData['director'] = req.body.director;
            }
            const updateMovie = await Movie.findOneAndUpdate({_id: existMovieID}, updateData, {new: true});
            res.json(updateMovie);
        }
    }

    public async updateMovie(req:Request, res: Response):Promise<void> {
        await Movie.findOne({_id: req.params.id}, function(error:any,doc:any) {
            if (error) {
                res.json('this ID is incorrect');
            } else {
                const newMovie= Movie.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
                res.json(newMovie);
            }
        });
        
    }

    public async deleteMovie(req: Request, res: Response):Promise<void> {
        await Movie.findOneAndDelete({_id: req.params.id});
        res.json('se borro con exito');    
    }

    public async createReviewMovie(req: Request, res: Response):Promise<void> {
        const newReview = new Review(req.body);
        await newReview.save();
        console.log(newReview);
        const movie = await Movie.findOne({_id: req.params.id}).populate('reviews'); 
        let updateReview:any[] = [];

        if(movie){
            updateReview = movie.reviews;
            updateReview.push({newReview});
        }
        
        const newMovie= await Movie.findOneAndUpdate({_id: req.params.id}, {'reviews': updateReview}, {new: true});
        res.json(newMovie);        
    }

    public async cloneMovie(req:Request, res: Response):Promise<void> {
        await Movie.findOne({_id: req.params.id}, {_id: false}, async function(error:any,doc:any) {
            if (error) {
                res.json('this ID is incorrect');
            } else {
                const newData = {
                    'slug': doc.slug,
                    'image': doc.image,
                    'title':doc.title,
                    'director': doc.director,
                    'platform': doc.platform,
                    'score': doc.score,
                    'createAt': doc.createAt,
                    'updateAT': doc.updateAT,
                    'reviews': doc.reviews
                };
                const newMovie = new Movie(newData);
                await newMovie.save(); 
                res.json({data: newMovie});  
            }
        });
        
    }

    routes() {
        this.router.get('/', this.getMovies);
        this.router.get('/:id', this.getMovie);
        this.router.post('/', this.createMovie);
        this.router.post('/createReview/:id', this.createReviewMovie);
        this.router.post('/cloneMovie/:id', this.cloneMovie);
        this.router.put('/:id', this.updateMovie);
        this.router.delete('/:id', this.deleteMovie);
    }
}
const movieRoutes = new MovieRouter();
movieRoutes.routes();


export default movieRoutes.router;
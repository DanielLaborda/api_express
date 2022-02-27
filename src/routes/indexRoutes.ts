import { Request, Response, Router } from 'express';

class IndexRoutes {
    //rutas iniciales del server
    router: Router;

    constructor() {
        this.router =Router();
        this.routes();
    }

    routes() {
        this.router.get('/', (req:Request, res:Response) => { res.send('API: /api/platform'); } );
    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;
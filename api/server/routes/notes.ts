import { Router, Request, Response } from "express";
import { Mood, Note } from "../models";

/**
 * User router 
 */
export class NotesRouter {

    // Init router
    private router: Router = Router();

    // New sub router for users 
    getRouter(): Router {

        /**
         * @swagger
         * /api/notes:
         *   get:
         *     tags:
         *      - User
         *     description:
         *      List of all users.
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Users
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.get("/notes", async(request: Request, response: Response) => {
            const users = await Mood.find({}).exec();
            response.json(users)
        });

                /**
         * @swagger
         * /api/users:
         *   post:
         *     tags:
         *      - User
         *     description:
         *      Create new user.
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: User
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.post("/notes", async(request: Request, response: Response) => {
            const author = await Mood.create(request.body);
            response.status(200).json(author);
        });

        /**
         * @swagger
         * /api/users/authenticate:
         *   get:
         *     tags:
         *      - User
         *     description:
         *          Authenticate a userr 
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Users Authenticte
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.post("/notes/id/:id", async(request: Request, response: Response) => {            
            let id = request.route.query.id
            const user = await Mood.findOne({ "id": id, }).exec();
            response.json(user)
        });

        //
        return this.router;
    }
}
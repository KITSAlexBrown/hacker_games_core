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
         *      List of all notes against a user
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
            const users = await Note.find({}).exec();
            response.json(users)
        });

        /**
         * @swagger
         * /api/notes/user/:id
         *   get:
         *     tags:
         *      - User
         *     description:
         *      Get all notes from a user
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
        this.router.get("/notes/user/:id", async(request: Request, response: Response) => {            
            // TODO add in token validation
            let id = request.params.id
            //
            const mood = await Note.find({ "user": id }).exec();
            //
            response.json(mood)
        });

        /**
         * @swagger
         * /api/notes/id/:id:
         *   get:
         *     tags:
         *      - User
         *     description:
         *      Get a certain note against a user
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
            // TODO add in token validation         
            let id = request.route.query.id
            const user = await Note.findOne({ "id": id }).exec();
            response.json(user)
        });

        //
        return this.router;
    }
}
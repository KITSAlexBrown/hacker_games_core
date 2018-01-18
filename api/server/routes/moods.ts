import { Router, Request, Response } from "express";
import { Mood } from "../models";

/**
 * User router 
 */
export class MoodsRouter {

    // Init router
    private router: Router = Router();

    // New sub router for users 
    getRouter(): Router {

        /**
         * @swagger
         * /api/users:
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
        this.router.get("/moods", async(request: Request, response: Response) => {
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
        this.router.post("/moods", async(request: Request, response: Response) => {
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
        this.router.post("/moods/id/:id", async(request: Request, response: Response) => {            
            let noonce = request.body.noonce
            let credential = request.body.credential
            let email = request.body.email_address
            const user = await Mood.findOne({
                    "email_address": email, 
                }).exec();
            response.json(user)
        });

        //
        return this.router;
    }
}
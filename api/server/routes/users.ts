import { Router, Request, Response } from "express";
import { User } from "../models";

/**
 * User router 
 */
export class UsersRouter {

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
        this.router.get("/users", async(request: Request, response: Response) => {
            const users = await User.find({}).exec();
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
        this.router.post("/users", async(request: Request, response: Response) => {
            const author = await User.create(request.body);
            response.status(200).json(author);
        });

        /**
         * @swagger
         * /api/users/id/:id:
         *   get:
         *     tags:
         *      - User
         *     description:
         *      Get a user
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
        this.router.get("/users/id/:id", async(request: Request, response: Response) => {  
            // TODO add in token validation         
            let id = request.route.id
            const user = await User.findOne({ "id": id }).exec();
            response.json(user)
        });

        /**
         * @swagger
         * /api/users/authenticate/noonce:
         *   get:
         *     tags:
         *      - User
         *     description:
         *      Noonce for a certain user
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Noonce
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.get("/users/authenticate/noonce", async(request: Request, response: Response) => {
            const noonce = await User.find({"email_address": request.query.email}).exec();
            response.json(noonce)
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
        this.router.post("/users/authenticate", async(request: Request, response: Response) => {            
            let noonce = request.body.noonce
            let credential = request.body.credential
            let email = request.body.email_address
            const user = await User.findOne({
                    "email_address": email, 
                    "password": credential 
                }).exec();
            response.json(user)
        });

        //
        return this.router;
    }
}
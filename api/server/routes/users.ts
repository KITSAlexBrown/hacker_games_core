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
         *      List of all users registered in system.
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
            const authors = await User.find({}).exec();
            response.json(authors)
        });

        /**
         * @swagger
         * /api/user:
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
            console.log("User has been added !")
            response.status(200).json(author);
        });

        //
        return this.router;
    }
}
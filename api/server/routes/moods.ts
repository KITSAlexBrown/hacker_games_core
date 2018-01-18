import { Router, Request, Response } from "express";
import { Note, Mood, IMood, INote, Sentiment } from "../models";
import * as speak from "speakeasy-nlp"

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
         * /api/moods:
         *   get:
         *     tags:
         *      - User
         *     description:
         *      List of all moods against a user
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Moods
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.get("/moods", async(request: Request, response: Response) => {
            const moods = await Mood.find({}).limit(10).exec();
            response.json(moods)
        });

        /**
         * @swagger
         * /api/moods:
         *   post:
         *     tags:
         *      - User
         *     description:
         *      Create a new mood
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Mood
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.post("/moods", async(request: Request, response: Response) => {
            //
            request.body.note_txt = request.body.note
            // Mood
            let mood: IMood = request.body
            // Simple sentiment analysis
            let language = speak.sentiment.analyze(request.body.note)  
            //
            let score: number = language['score']
            let positive: Sentiment = language['positive']
            let negative: Sentiment = language['negative']
            //
            mood.sentiment_score = score
            mood.sentiment_positive = positive
            mood.sentiment_negative = negative
            //
            const moodCreate = await Mood.create(mood);
            // Note
            let note = new Note()
            note.note = request.body.note
            note.mood = moodCreate.id
            note.user = moodCreate.user
            //
            const noteCreate = await Note.create(note);
            //
            response.status(200).json(moodCreate);
        });

        /**
         * @swagger
         * /api/users/authenticate:
         *   get:
         *     tags:
         *      - User
         *     description:
         *      Get a mood against its id and a user
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
        this.router.get("/moods/id/:id", async(request: Request, response: Response) => {            
            // TODO add in token validation
            let id = request.params.id
            console.log("HERE IS OUR ID")
            console.log(id)
            //
            const mood = await Mood.findOne({ "_id": id }).exec();
            //
            const notes = await Note.findOne({ "mood": id }).exec();
            //
            let combine = await Promise.all([mood.toObject(), notes.toObject()]);
            //
            combine[0]['notes'] = combine[1]
            //
            response.json(combine[0])
        });

        /**
         * @swagger
         * /api/users/authenticate:
         *   get:
         *     tags:
         *      - User
         *     description:
         *      Get a mood against its id and a user
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
        this.router.get("/moods/user/:id", async(request: Request, response: Response) => {            
            // TODO add in token validation
            let id = request.params.id
            //
            const mood = await Mood.find({ "user": id }).exec();
            //
            response.json(mood)
        });

        //
        return this.router;
    }
}
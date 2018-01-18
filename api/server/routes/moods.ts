import { Router, Request, Response } from "express";
import { Note, Mood, IMood, INote, Sentiment } from "../models";
import * as speak from "speakeasy-nlp"
import { addMeta } from "./index";

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
            response.json(addMeta(moods, request))
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
            let positive: string[] = language['positive']['words']
            let negative: string[] = language['negative']['words']
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
            response.status(200).json(addMeta(moodCreate, request));
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
            //
            const mood = await Mood.findOne({ "_id": id }).exec();
            const notes = await Note.findOne({ "mood": id }).exec();
            let combine = await Promise.all([mood.toObject(), notes.toObject()]);
            combine[0]['notes'] = combine[1]
            //
            response.json(addMeta(combine[0], request))
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
            let id = request.params.id
            const mood = await Mood.find({ "user": id }).exec();
            response.json(addMeta(mood, request))
        });

        /**
         * @swagger
         * /api/moods/user/:id/sentiment:
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
        this.router.get("/moods/user/:id/emotion", async(request: Request, response: Response) => {  
            let stub = {
                "results": [
                    { "date": "1-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "2-MAY-2012", "data" : [ 4, 5 , 6] },
                    { "date": "3-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "4-MAY-2012", "data" : [ 1, 3 , 6] },
                    { "date": "5-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "6-MAY-2012", "data" : [ 1, 5 , 7] },
                    { "date": "7-MAY-2012", "data" : [ 1, 4 , 2] },
                    { "date": "8-MAY-2012", "data" : [ 1, 6 , 6] },
                    { "date": "1-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "9-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "10-MAY-2012", "data" : [ 3, 5 , 6] },
                    { "date": "11-MAY-2012", "data" : [ 1, 5 , 1] },
                    { "date": "12-MAY-2012", "data" : [ 5, 5 , 6] },
                    { "date": "13-MAY-2012", "data" : [ 1, 4 , 6] },
                    { "date": "14-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "15-MAY-2012", "data" : [ 2, 2 , 2] },
                    { "date": "16-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "17-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "18-MAY-2012", "data" : [ 3, 3 , 6] },
                    { "date": "19-MAY-2012", "data" : [ 1, 5 , 3] },
                    { "date": "20-MAY-2012", "data" : [ 1, 4 , 6] },
                    { "date": "21-MAY-2012", "data" : [ 4, 3 , 2] },
                    { "date": "22-MAY-2012", "data" : [ 1, 5 , 3] },
                    { "date": "23-MAY-2012", "data" : [ 7, 5 , 6] },
                    { "date": "24-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "25-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "26-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "27-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "28-MAY-2012", "data" : [ 1, 5 , 6] },
                    { "date": "29-MAY-2012", "data" : [ 1, 5 , 6] },

                ]
            }
            response.json(addMeta(stub, request))
        });

        /**
         * @swagger
         * /api/moods/id/:id:
         *   post:
         *     tags:
         *      - User
         *     description:
         *      Update a mood
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
        this.router.post("/moods/id/:id", async(request: Request, response: Response) => {
            //
            let id = request.params.id
            // Mood
            let mood: IMood = request.body
            // let language = speak.sentiment.analyze(request.body.note_txt)  
            //
            /**
            if(language){
                let score: number = language['score']
                let positive: string[] = language['positive']['words']
                let negative: string[] = language['negative']['words']
                mood.sentiment_score = score
                mood.sentiment_positive = positive
                mood.sentiment_negative = negative
            }
            **/
            ///
            const moodUpdate = await Mood.update({"_id": id}, mood )
            //
            response.status(200).json(addMeta(moodUpdate, request));
        });
        //
        return this.router;
    }
}
import { Router, Request, Response } from "express";
import { Note, Mood, IMood, INote, Sentiment } from "../models";
import * as speak from "speakeasy-nlp"
import { addMeta, addError } from "./index";

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
         *      Get a mood against avergaed
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
            //
            let id = request.params.id
            //
            var dateQuery = new Date();
            dateQuery.setDate(dateQuery.getDate()-30);
            //
            const moodAgg = await Mood.aggregate(
            // { $match: {'user': id  } },
            { $group: {'_id': {
                                'year': { '$year': "$create" },
                                'month': { '$month': "$create" },
                                'day': { '$dayOfMonth': "$create" }
                            },
                            first: { $min: "$create" },
                            mood: { $avg: "$mood" },
                        }
            }).project(
                { 
                    mood: "$mood", 
                    create: 
                        { $dateToString: { format: "%d-%m-%Y", date: "$first" }  } 
                }
            ).exec();
            //
            const mood = await Mood.find({
                create: {
                    $gte: dateQuery,
                }
            }).exec();
            //
            response.json(addMeta(moodAgg, request))
        });

         /**
         * @swagger
         * /api/moods/user/:id/sentiment:
         *   get:
         *     tags:
         *      - User
         *     description:
         *      Get a sentiment score from a user for a day
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
        this.router.get("/moods/user/:id/sentiment", async(request: Request, response: Response) => {  
            //
            let id = request.params.id
            //
            var dateQuery = new Date();
            dateQuery.setDate(dateQuery.getDate()-30);
            //
            const moodAgg = await Mood.aggregate(
            // { $match: {'user': id  } },
            { $group: {'_id': {
                                'year': { '$year': "$create" },
                                'month': { '$month': "$create" },
                                'day': { '$dayOfMonth': "$create" }
                            },
                            first: { $min: "$create" },
                            mood: { $avg: "$sentiment_score" },
                        }
            }).project(
                { 
                    mood: "$mood", 
                    create: 
                        { $dateToString: { format: "%d-%m-%Y", date: "$first" }  } 
                }
            ).exec();
            //
            const mood = await Mood.find({
                create: {
                    $gte: dateQuery,
                }
            }).exec();
            //
            response.json(addMeta(moodAgg, request))
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
            //
            if(request.body.note === null){ 
                response.status(422).json(addError("Malformed entity request", request))
                return
            }
            // Set the text we require
            request.body.note_txt = request.body.note
            //
            if(request.body.note !== null){
                let language = speak.sentiment.analyze(request.body.note)  
                let score: number = language['score']
                let positive: string[] = language['positive']['words']
                let negative: string[] = language['negative']['words']
                mood.sentiment_score = score
                mood.sentiment_positive = positive
                mood.sentiment_negative = negative
            }
            ///
            const moodUpdate = await Mood.update({"_id": id}, mood )
            //
            response.status(200).json(addMeta(moodUpdate, request));
        });

        //
        return this.router;
    }
}
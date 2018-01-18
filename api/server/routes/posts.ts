import { Router, Request, Response } from "express";
import { User } from "../models";

/**
export class PostRouter {

    static routes(): Router {
        return Router()
            .get("/post", async (request: Request, response: Response) => {

                const posts = await Post.find({}).populate("author").exec();

                response.json(posts)
            })
            .post("/post", async (request: Request, response: Response) => {
                let data = request.body;
                let author = await Author.findOne().exec();
                data.author = author._id;

                const post = await Post.create(data);

                response.json(post)
            });
    }
}
**/
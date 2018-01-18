import * as express from "express";
import { json, urlencoded } from "body-parser";
import * as http from "http";
import * as path from "path";

import { UsersRouter } from "./routes/users";
import { APIDocsRouter } from "./routes/swagger";
import { IResponse } from "./models/index";

const app: express.Application = express();

app.use(json());
app.use(urlencoded({
    extended: true
}));

// Handle root
app.get("/", (request: express.Request, response: express.Response) => {
    response.json({
        name: "Express application"
    })
});
app.use("/api", new UsersRouter().getRouter());
app.use("/api/swagger", new APIDocsRouter().getRouter());
app.use("/docs", express.static(path.join(__dirname, './assets/swagger')));

//////////////////
// Error Handler 
//////////////////
app.use((err: Error & { status: number }, request: express.Request, response: express.Response, next: express.NextFunction): void => {
    //
    response.status(err.status || 500);
    //
    let responseCompose: IResponse = {
        message: "Server error",
        reason: (err.message || ""),
        status: err.status,
        timestamp: new Date(),
        stack: (err.stack || "")
    };
    response.json(responseCompose)
});


const server: http.Server = app.listen(process.env.PORT || 3000);

export { server };

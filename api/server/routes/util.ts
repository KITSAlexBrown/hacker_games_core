import { Router, Request, Response } from "express";

// Real simple meta append function
export function addMeta(meta : any, request: Request){
    return { "results": meta }
}
import { Router, Request, Response } from "express";

// Real simple meta append function
export function addMeta(meta : any, request: Request){
    return { "results": meta }
}

// Real simple meta append function
export function addError(meta : any, request: Request){
    return { "error": meta }
}
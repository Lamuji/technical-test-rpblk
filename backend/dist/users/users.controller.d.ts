import { Request, Response } from 'express';
import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getAllUsers(request: Request, response: Response): Promise<any>;
    createPost(request: any, response: any, body: any): Promise<import("./users.model").Post>;
}

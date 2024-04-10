import { Request, Response } from 'express';
import { UsersService } from "./users.service";
import { Post as post } from "./users.model";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getAllUsers(request: Request, response: Response): Promise<any>;
    getUserByEmail(response: Response, email: string): Promise<Response<any, Record<string, any>>>;
    create(postData: post): Promise<post>;
}

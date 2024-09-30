import { ModeAction } from "../Enum/ModeAction";

export interface ValueKey{
    Id:string,
    Name:string,
    PathUrl?:string,
    Status:ModeAction
}
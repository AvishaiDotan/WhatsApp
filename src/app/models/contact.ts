import { ContactState, Gender } from "../enums"
import { Msg } from "./msg"

export interface Contact {
    "gender": Gender,
    "name": {
        "first": string,
        "last": string,
    },
    "phone": string,
    "id": {
        "name": string,
        "value": string
    },
    "picture": {
        "large": string,
        "medium": string,
        "thumbnail": string
    },
    "msgs": Msg[]
    "unread": number
    state: ContactState
    moto: string
    isMute: boolean
    isBlocked: boolean
}

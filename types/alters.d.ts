import type { Ref } from 'vue'

export interface ISocialMedia {
    Instagram? : string,
     Tiktok? : string,
     LinkedIn? : string,
     Twitch? : string,
}

export interface IAlter {
    name : string,
    role : string,
    description : string,
    social? : Ref<ISocialMedia>,
}


export type Suit = '♠' | '♥' | '♣' | '♦'

export interface ISocialMedia {
    Instagram? : string,
    Tiktok? : string,
    LinkedIn? : string,
    Twitch? : string,
}

export interface IAlter {
    name : string,
    role : string,
    suit : Suit,
    description : string[],
    social? : ISocialMedia,
    /** Rendered face-down — some alters don't share */
    hidden? : boolean,
}

export interface ISkill {
    name : string,
    /** Live example of the skill in use (URL) */
    example? : string,
    children? : ISkill[],
}

export interface ISkillSuit {
    category : string,
    suit : Suit,
    skills : ISkill[],
}

export interface IProject {
    name : string,
    url? : string,
    repo? : string,
    image? : string,
    /** 'contain' for small or odd-shaped shots that shouldn't be cropped to 16:10 */
    imageFit? : 'cover' | 'contain',
    description? : string,
}

export interface IProjectGroup {
    title : string,
    suit : Suit,
    projects : IProject[],
}

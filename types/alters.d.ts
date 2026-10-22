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
    /** Slug of its page under /work (data/caseStudies.ts) */
    caseStudy? : string,
}

export interface IProjectGroup {
    title : string,
    suit : Suit,
    projects : IProject[],
}

export interface ICaseStudySection {
    heading : string,
    paragraphs? : string[],
    points? : string[],
}

export interface ICaseStudy {
    slug : string,
    name : string,
    suit : Suit,
    /** Small line above the title */
    kicker : string,
    /** One or two sentences; also the page's search description */
    summary : string,
    image : string,
    imageAlt : string,
    url? : string,
    repo? : string,
    /** YYYY-MM-DD the copy last changed; the sitemap's lastmod */
    updated : string,
    sections : ICaseStudySection[],
}

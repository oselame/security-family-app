
export class Config {
    static readonly LOCATIONAUTHORIZATION_ALWAYS: string = "always";
    static readonly LOCATIONAUTHORIZATION_WHEN_IN_USE: string = "when_in_use";
    static readonly SUCCESS: number = 0;
    static readonly ERRO_GPS_DISABLED: number = 1;
    static readonly ERRO_NOT_AUTHORIZED: number = 2;

    static readonly SECURITYDB: string = "securitydb";
    static readonly USER: string = "user";
    static readonly MEMBERS: string = "members";
    //static readonly USER_NAME: string = "user_name";
    //static readonly USER_FONE: string = "user_fone";
    static readonly SERVER = {
        urlapi: 'http://oselame.ddns.net:3000/api/v1/',
        location: 'location/',
        member: 'member/'

    }

}
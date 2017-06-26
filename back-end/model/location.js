class Location {
    constructor(
        public id:string, public name: string, public date : string, public latitude: number, public longitude:number
    ){}

}

module.exports = new Location();
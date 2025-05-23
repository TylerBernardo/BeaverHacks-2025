import {Review} from "./reviews.js"

export class User{
    userID = -1
    username = ""
    name = ""
    credits = 0
    Rating = -1
    reviews = []
    registeredClasses = [] //array of class ids

    constructor(_userID,_username, _name){
        this.userID = _userID
        this.username = _username
        this.name = _name
    }

    addCredits(creditAmmount){
        this.credits += creditAmmount
    }

    //update rating and review list
    addReview(){

    }

    removeClass(id){
        var index = this.registeredClasses.indexOf(id)
        if(index > -1){
            this.registeredClasses.splice(index,1)
        }
    }

    static fromDB(dbO){
        var toReturn = new User(dbO.userID,dbO.username,dbO.name)
        toReturn.addCredits(dbO.credits)
        toReturn.registeredClasses = dbO.registeredClasses
        toReturn.reviews = dbO.reviews
        toReturn.Rating = dbO.Rating
        if(toReturn.registeredClasses == undefined){
            toReturn.registeredClasses = []
        }
        return toReturn
    }
}


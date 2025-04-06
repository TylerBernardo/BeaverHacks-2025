import {Review} from "./reviews.js"

export class User{
    userID = -1
    username = ""
    name = ""
    credits = 0
    Rating = 5
    reviews = []
//TODO: hashed password
//TODO: signed up classes and events

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

    static fromDB(dbO){
        var toReturn = new User(dbO.userID,dbO.username,dbO.name)
        toReturn.addCredits(dbO.credits)
        return toReturn
    }
}


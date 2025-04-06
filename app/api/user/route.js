import {User} from "../../backend/user.js"
import {Database} from "../../backend/database.js"
import {cookies} from 'next/headers'
import {getIronSession} from 'iron-session'
import {defaultSession, sessionOptions} from "../lib"

//get user
//params - id of user to get
//example: http://localhost:3000/api/user?id=2
export async function GET(request){
    //var dummyUser = new User(1,"TEST USER")
    //dummyUser.addCredits(200)
    var db = await Database.getDatabase()
    var params = request.nextUrl.searchParams
    const session = await getIronSession(await cookies(),sessionOptions)
    if(params.get("id") == undefined){
        console.log(session)
        if(session.isLoggedIn){
            var user = await db.getUser(session.id)
            return new Response(JSON.stringify(user),{
                status:200,
                headers: {'Content-Type':'application/json'}
            })
        }else{
            return new Response("no id provided",{
                status:400,
                headers: {'Content-Type':'application/text'}
            })
        }
    }


    var user = await db.getUser(params.get("id"))
    return new Response(JSON.stringify(user),{
        status:200,
        headers: {'Content-Type':'application/json'}
    })
}

//create user
//body{
//  name: name of the user
//  username: username of the user
//}
//TODO: remove, made obselete by login
export async function POST(request){
    const body = await request.json()

    //var dummyUser = new User(2,body.name)
    //dummyUser.addCredits(200)
    var db = await Database.getDatabase()
    await db.addUser(body)
    return new Response("Created user",{
        status:201,
        headers:{'Content-Type':'application/text'}
    })
}
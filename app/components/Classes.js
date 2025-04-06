"use client"
import { DayToString, MonthToString, WeekDayToString } from "../util/dateHelper";
import ClassCard from "./ClassCard";
import { useEffect, useState } from "react";
import Rating from "./Rating";

export default function() {

    let [events, setEvents] = useState(null);
    let [detailEventIdx, setDetailEvent] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/getClasses', {method: "GET"})

                const body = await res.json()

                for(let i = 0; i < body.length; i++) {
                    const res2 = await fetch('/api/user?id=' + body[i]["creatorID"], {method: "GET"})
                    const user = await res2.json()


                    console.log(user)
                    body[i]["creatorName"] = user.name
                    body[i]["creatorRating"] = user.Rating
                }

                setEvents(body)

            } catch (e) {
                console.log(e)
            }
        })()

    }, [])

    function loading() {
        return <div>Loading...</div>
    }

    function displayClasses() {
        return events.map((event, idx) => {
            let startDate = new Date(event.startTime)
            let weekday = WeekDayToString(startDate.getDay())
            let day = DayToString(startDate.getDate())
            let month = MonthToString(startDate.getMonth())
            let start = startDate.toLocaleTimeString(undefined, {timeStyle: "short"})
            let end = new Date(event.endTime).toLocaleTimeString(undefined, {timeStyle: "short"})
            return <ClassCard key={idx} creator={event["creatorName"]} time={start + " - " + end} date={month + " " + day + " (" + weekday + ")"} title={event.name} description={event.description} cost={event.cost} onViewDetails={()=> {setDetailEvent(idx)}} />
        })
    }

    function displayDetails() {
        let detailEvent = events[detailEventIdx]
        let startDate = new Date(detailEvent.startTime)
        let weekday = WeekDayToString(startDate.getDay())
        let day = DayToString(startDate.getDate())
        let month = MonthToString(startDate.getMonth())
        let start = startDate.toLocaleTimeString(undefined, {timeStyle: "short"})
        let end = new Date(detailEvent.endTime).toLocaleTimeString(undefined, {timeStyle: "short"})

        return (
            <div className="bg-black/50 inset-0 absolute w-full h-full flex items-center justify-center">
                <div className="w-[500px]">
                    <h1 className="text-3xl text-center bg-gray-700 w-full mb-4 p-2 rounded-md">{detailEvent.name}</h1>
                    <div className="bg-gray-700 p-4 w-full rounded-md">
                        <p>
                            Instructor: {detailEvent.creatorName}
                        </p>
                        <Rating rating={detailEvent.creatorRating} />
                        <p>
                            Cost: ${detailEvent.cost}
                        </p>
                        <p>
                            Date: {month + " " + day + " (" + weekday + ")"}
                        </p>
                        <p>
                            Time: {start} - {end}
                        </p>
                        <p>
                            Description: {detailEvent.description}
                        </p>
                    </div>
                    <button className="bg-gray-700 hover:bg-gray-800 active:bg-gray-900 mt-5 text-xl p-2 w-full rounded-md" onClick={() => setDetailEvent(null)}>Back</button>
                </div>
                
            </div>
        )
    }

    return (
      <div className={"w-full flex flex-wrap "}>
        {events == null ? loading() : displayClasses()}
        {detailEventIdx != null && displayDetails()}
      </div>
    );
  }
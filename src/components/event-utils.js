import { db } from '../firebase'
import { query, collectionGroup, getDocs } from 'firebase/firestore'
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today


export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    description: "HELLO HELLO",
    fun: "fun fun fun"
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]

export async function allEvents() {
    const events = query(collectionGroup(db, 'events'))
    const newQuery = await getDocs(events);
    
    var fun = []
    newQuery.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        let obj = {
            id: doc.id,
            title: doc.data().title,
            end: doc.data().end,
            start: doc.data().start,
            descripton: doc.data().description
        }

        console.log(obj, "NEW QUERY!!!!!!!")
        fun.push(obj)
        ;
      })
      console.log(fun)
      return fun
}

export function createEventId() {
  return String(eventGuid++)
}
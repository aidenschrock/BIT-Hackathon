import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { formatDate } from '@fullcalendar/core'
import listPlugin from '@fullcalendar/list'
import { createEventId, allEvents } from '../components/event-utils'
import { db } from '../firebase'
import moment from 'moment'
import { doc, deleteDoc } from "firebase/firestore"



export default class Calendar extends Component {
  constructor(props) {
    super(props)
  this.title = React.createRef() 
  this.description = React.createRef()
  this.assignedto = React.createRef()
  this.date = React.createRef()
  }
    state = {
      weekendsVisible: true,
      currentEvents: []
    }
  
    render() {
      return (
        <div className='demo-app'>
          
    
  
          {this.renderSidebar()}
          <div className='demo-app-main'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
              }}
              initialView='dayGridMonth'
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={this.state.weekendsVisible}
              eventSources={allEvents} // alternatively, use the `events` setting to fetch from a feed
              select={this.handleDateSelect}
              eventDrop={this.handleEventDrop}
              eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
              eventAdd={function(){}}
              eventChange={function(){}}*/
              // eventRemove={function(){

              // }
            />
          </div>
        </div>
      )
    }

  
    renderSidebar() {
      
      return (
        <div className='demo-app-sidebar'>
          <div>
            <form>
              <input placeholder="Chore Title" ref={this.title}/><br/><br/>
              <input placeholder="Chore Description" ref={this.description}/><br/><br/>
              <input placeholder="Person it should be assigned to" ref={this.assignedto}/><br/><br/>
              <input type="date" min="2022-01-01" max="2030-12-31" ref={this.date}></input><br/><br/>
              <button type="submit" onClick={addEvent}>Add Event</button>
            </form>
          </div>
          <div className='demo-app-sidebar-section'>
            <h2>Instructions</h2>
            <ul>
              <li>Select dates and you will be prompted to create a new event</li>
              <li>Drag, drop, and resize events</li>
              <li>Click an event to delete it</li>
            </ul>
          </div>
          <div className='demo-app-sidebar-section'>
            <label>
              <input
                type='checkbox'
                checked={this.state.weekendsVisible}
                onChange={this.handleWeekendsToggle}
              ></input>
              toggle weekends
            </label>
          </div>
          <div className='demo-app-sidebar-section'>
            <h2>All Events ({this.state.currentEvents.length})</h2>
            <ul>
              {this.state.currentEvents.map(renderSidebarEvent)}
            </ul>
          </div>
        </div>
      )
    }
  
    

    handleWeekendsToggle = () => {
      this.setState({
        weekendsVisible: !this.state.weekendsVisible
      })
    }
  
    handleDateSelect = (selectInfo) => {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
  
      calendarApi.unselect() // clear date selection
  
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    }
  
    handleEventClick = (clickInfo) => {
      console.log(clickInfo.event.id)
      if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
        deleteDoc(doc(db, "calendar/Eik9e9CTCTBcwrbWzltP/events", clickInfo.event.id));
        
      }
    }
  
    handleEvents = (events) => {
      this.setState({
        currentEvents: events
      })
    }
  
  
  
  handleEventDrop = (arg) => {
    var start = moment(arg.event.start).local().format()
    var end = moment(arg.event.end).local().format()

    db.collection("data").add({
      start: start,
      end: end
  })
  }

  
}

function addEvent(event) {
  
  event.preventDefault()
  console.log(event)
}


 function renderEventContent(eventInfo) {
    return (
      console.log(eventInfo),
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i><p>{eventInfo.event.extendedProps.description}</p>
      </>
      
    )
  }
  
  function renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
        <i>{event.title}</i><b>{event.extendedProps.description}</b>
      </li>
    )
  }

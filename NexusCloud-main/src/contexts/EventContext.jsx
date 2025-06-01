"use client"

import { createContext, useContext, useState } from 'react'

const EventContext = createContext()

export function EventProvider({ children }) {
  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: "期末試験：情報システム",
      date: "2024/4/15",
      type: "exam",
      description: "情報システム概論の期末試験",
      startTime: "09:00",
      endTime: "10:30",
      color: "#f56565"
    },
    { 
      id: 2, 
      title: "プロジェクト発表",
      date: "2024/4/20",
      type: "presentation",
      description: "チーム開発プロジェクトの最終発表",
      startTime: "13:00",
      endTime: "15:00",
      color: "#3182ce"
    },
    { 
      id: 3, 
      title: "個人面談",
      date: "2024/4/25",
      type: "meeting",
      description: "指導教員との定期面談",
      startTime: "16:00",
      endTime: "16:30",
      color: "#48bb78"
    }
  ])

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }])
  }

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ))
  }

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId))
  }

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider')
  }
  return context
} 
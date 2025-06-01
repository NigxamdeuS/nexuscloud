"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, getCurrentUser } from 'aws-amplify/auth'
import { DataStore } from '@aws-amplify/datastore'
import { Calendar } from '../../../models'
import Link from 'next/link'
import Header from '../../components/Header'
import { useEvents } from '../../../contexts/EventContext'

// ヘルパー関数を追加
function isLightColor(color) {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return brightness > 128
}

export default function CalendarPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const { events, addEvent, updateEvent, deleteEvent } = useEvents()
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('month') // 'month' or 'week'
  const [editingEvent, setEditingEvent] = useState(null)
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    description: '',
    type: 'personal',
    color: '#1f4e5f',
    isAllDay: false
  })
  const [isDataStoreReady, setIsDataStoreReady] = useState(false)
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
  const [eventToDelete, setEventToDelete] = useState(null)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [deletedEventTitle, setDeletedEventTitle] = useState('')
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    async function initialize() {
      try {
        await DataStore.start()
        setIsDataStoreReady(true)
        await checkUser()
        await fetchEvents()
      } catch (error) {
        console.error('Error initializing:', error)
      }
    }
    initialize()
  }, [])

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch (err) {
      router.push('/login')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  async function fetchEvents() {
    try {
      const events = await DataStore.query(Calendar)
      setEvents(events)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  // 日付選択ハンドラー
  const handleDateSelect = (date) => {
    // UTC時間を考慮して日付を設定
    const localDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    setSelectedDate(localDate)
    // 選択した日付を新規イベントのデフォルト値として設定
    const formattedDate = localDate.toISOString().slice(0, 10)
    setNewEvent(prev => ({
      ...prev,
      date: formattedDate
    }))
  }

  // 選択した日付のイベントを取得
  const selectedDateEvents = events.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.toDateString() === selectedDate.toDateString()
  })

  // カレンダーの日付を生成
  const getDaysInMonth = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []
    
    // 前月の日付を追加
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -i)
      days.unshift({ date: prevDate, isCurrentMonth: false })
    }
    
    // 当月の日付を追加
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true })
    }
    
    // 次月の日付を追加
    const remainingDays = 42 - days.length // 6週間分
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false })
    }
    
    return days
  }

  // 月の移動
  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))
  }

  // 週の日付を生成する関数を追加
  const getDaysInWeek = () => {
    const startOfWeek = new Date(selectedDate)
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())
    const days = []
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      days.push({ date, isCurrentMonth: date.getMonth() === selectedDate.getMonth() })
    }
    
    return days
  }

  // 週の移動
  const prevWeek = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() - 7)
    setSelectedDate(newDate)
  }

  const nextWeek = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() + 7)
    setSelectedDate(newDate)
  }

  // 週表示のレンダリング関数を追加
  const renderWeekView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const days = getDaysInWeek()
    const today = new Date()

    return (
      <div className="week-view">
        <div className="week-header">
          <div className="time-column" />
          {days.map(({ date }) => (
            <div 
              key={date.toISOString()} 
              className={`week-day-header ${
                date.toDateString() === today.toDateString() ? 'today' : ''
              }`}
            >
              <div>{date.toLocaleDateString('ja-JP', { weekday: 'short' })}</div>
              <div>{date.getDate()}</div>
              <div className="all-day-events">
                {events
                  .filter(event => 
                    new Date(event.date).toDateString() === date.toDateString() && 
                    event.isAllDay
                  )
                  .map(event => (
                    <div
                      key={event.id}
                      className="all-day-event"
                      style={{ backgroundColor: event.color }}
                      onClick={() => handleEditEvent(event)}
                    >
                      {event.title}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="week-grid">
          <div className="time-slots">
            {hours.map(hour => (
              <div key={hour} className="time-slot">
                {`${hour}:00`}
              </div>
            ))}
          </div>
          {days.map(({ date }) => (
            <div key={date.toISOString()} className="day-column">
              <div className="hour-lines">
                {hours.map(hour => (
                  <div 
                    key={hour} 
                    className="hour-line" 
                    style={{ top: `${hour * 60}px` }}
                  />
                ))}
              </div>
              {events
                .filter(event => 
                  new Date(event.date).toDateString() === date.toDateString() && 
                  !event.isAllDay
                )
                .map(event => {
                  const [startHours, startMinutes] = (event.startTime || '09:00').split(':')
                  const [endHours, endMinutes] = (event.endTime || '10:00').split(':')
                  const startTop = parseInt(startHours) * 60 + parseInt(startMinutes)
                  const endTop = parseInt(endHours) * 60 + parseInt(endMinutes)
                  const height = endTop - startTop

                  return (
                    <div
                      key={event.id}
                      className="week-event"
                      style={{
                        top: `${startTop}px`,
                        height: `${height}px`,
                        backgroundColor: event.color
                      }}
                      onClick={() => handleEditEvent(event)}
                    >
                      {event.title}
                      <div className="event-time">
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // renderCalendarGrid関数を修正
  const renderCalendarGrid = () => {
    return viewMode === 'month' ? (
      <div className="calendar-grid">
        <div className="weekdays">
          {['日', '月', '火', '水', '木', '金', '土'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="days">
          {(viewMode === 'month' ? getDaysInMonth() : getDaysInWeek()).map(({ date, isCurrentMonth }, index) => (
            <div
              key={index}
              className={`day ${!isCurrentMonth ? 'other-month' : ''} 
                ${date.toDateString() === selectedDate.toDateString() ? 'active' : ''}`}
              onClick={() => handleDateSelect(date)}
            >
              <span className="day-number">{date.getDate()}</span>
              {events.filter(event => 
                new Date(event.date).toDateString() === date.toDateString()
              ).map((event, i) => (
                <div 
                  key={i}
                  className="event-indicator"
                  style={{ backgroundColor: event.color }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditEvent(event)
                  }}
                >
                  {viewMode === 'week' && event.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ) : (
      renderWeekView()
    )
  }

  // イベント作成ハンドラーを修正
  const handleAddEvent = (newEvent) => {
    addEvent(newEvent)
    setShowEventModal(false)
  }

  const handleUpdateEvent = (updatedEvent) => {
    updateEvent(updatedEvent)
    setShowEventModal(false)
    setEditingEvent(null)
  }

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId)
    setShowDeleteConfirmModal(false)
    setEventToDelete(null)
  }

  // カラー選択用の定義済みカラーパレット
  const predefinedColors = [
    '#1f4e5f', // デフォルト
    '#e74c3c', // 赤
    '#3498db', // 青
    '#2ecc71', // 緑
    '#f1c40f', // 黄
    '#9b59b6', // 紫
    '#e67e22', // オレンジ
    '#1abc9c', // ターコイズ
  ]

  // 削除ボタンクリック時のハンドラー
  const handleDeleteClick = (event) => {
    setEventToDelete(event)
    setShowDeleteConfirmModal(true)
  }

  // 削除確認のハンドラーを修正
  const handleConfirmDelete = async () => {
    if (!eventToDelete) return

    try {
      const toDelete = await DataStore.query(Calendar, eventToDelete.id)
      if (toDelete) {
        await DataStore.delete(toDelete)
        await fetchEvents()
        setShowEventModal(false)
        setEditingEvent(null)
        
        // 削除完了通知用の状態を設定
        setDeletedEventTitle(eventToDelete.title)
        setShowNotificationModal(true)
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('イベントの削除に失敗しました: ' + error.message)
    } finally {
      setShowDeleteConfirmModal(false)
      setEventToDelete(null)
    }
  }

  // イベントの編集
  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setNewEvent({
      title: event.title,
      date: event.date,
      startTime: event.time,
      endTime: event.time,
      description: event.description,
      type: event.type,
      color: event.color || '#1f4e5f',
      isAllDay: event.isAllDay
    })
    setShowEventModal(true)
  }

  if (!user || !isDataStoreReady) return null

  return (
    <div className="dashboard">
      <Header />
      <div className="content-grid">
        <section className="dashboard-section">
          <h2 className="section-title">カレンダー</h2>
          <div className="calendar-navigation">
            <button 
              className="nav-button" 
              onClick={viewMode === 'month' ? prevMonth : prevWeek}
            >
              &lt;
            </button>
            <span>
              {viewMode === 'month' 
                ? selectedDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })
                : `${selectedDate.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}週`
              }
            </span>
            <button 
              className="nav-button" 
              onClick={viewMode === 'month' ? nextMonth : nextWeek}
            >
              &gt;
            </button>
          </div>
          {renderCalendarGrid()}
        </section>

        <section className="dashboard-section">
          <div className="selected-date">
            <h2>{selectedDate.toLocaleDateString('ja-JP', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              weekday: 'long'
            })}</h2>
            <button 
              className="new-event-button"
              onClick={() => setShowEventModal(true)}
            >
              新規イベント
            </button>
          </div>
          {selectedDateEvents.length > 0 ? (
            <div className="event-list">
              {selectedDateEvents.map(event => (
                <div 
                  key={event.id} 
                  className="event-item"
                  style={{ borderLeftColor: event.color }}
                >
                  <div className="event-content">
                    <div className="event-title">{event.title}</div>
                    <div className="event-description">{event.description}</div>
                  </div>
                  <div className="event-actions">
                    <button 
                      className="event-action-button event-edit-button"
                      onClick={() => handleEditEvent(event)}
                    >
                      編集
                    </button>
                    <button 
                      className="event-action-button event-delete-button"
                      onClick={() => handleDeleteClick(event)}
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-events">この日の予定はありません</p>
          )}
        </section>
      </div>

      {showEventModal && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <div className="event-modal-header">
              <h3 className="event-modal-title">
                {editingEvent ? 'イベントを編集' : '新規イベント'}
              </h3>
              <button 
                className="event-modal-close"
                onClick={() => {
                  setShowEventModal(false)
                  setEditingEvent(null)
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}>
              <div className="event-modal-body">
                <div className="event-form-group">
                  <label className="event-form-label">イベントのタイトル *</label>
                  <input
                    type="text"
                    className="event-form-input"
                    value={newEvent.title}
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                    required
                    placeholder="タイトルを入力してください"
                  />
                </div>

                <div className="event-form-group">
                  <label className="event-form-label">日付と時間 *</label>
                  <div className="event-datetime-group">
                    <input
                      type="date"
                      className="event-form-input"
                      value={selectedDate.toISOString().split('T')[0]}
                      disabled
                      required
                    />
                    <label className="event-allday-toggle">
                      <input
                        type="checkbox"
                        checked={newEvent.isAllDay}
                        onChange={e => setNewEvent({...newEvent, isAllDay: e.target.checked})}
                      />
                      終日
                    </label>
                    {!newEvent.isAllDay && (
                      <div className="event-time-inputs">
                        <input
                          type="time"
                          className="event-form-input"
                          value={newEvent.startTime}
                          onChange={e => setNewEvent({...newEvent, startTime: e.target.value})}
                          required={!newEvent.isAllDay}
                        />
                        <span className="time-separator">〜</span>
                        <input
                          type="time"
                          className="event-form-input"
                          value={newEvent.endTime}
                          onChange={e => {
                            if (e.target.value > newEvent.startTime) {
                              setNewEvent({...newEvent, endTime: e.target.value})
                            } else {
                              alert('終了時間は開始時間より後に設定してください')
                            }
                          }}
                          required={!newEvent.isAllDay}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="event-form-group">
                  <label className="event-form-label">イベントの詳細 *</label>
                  <textarea
                    className="event-form-input event-form-textarea"
                    value={newEvent.description}
                    onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                    required
                    placeholder="詳細を入力してください"
                  />
                </div>

                <div className="event-form-group">
                  <label className="event-form-label">種類 *</label>
                  <select
                    className="event-type-select"
                    value={newEvent.type}
                    onChange={e => setNewEvent({...newEvent, type: e.target.value})}
                    required
                  >
                    <option value="">種類を選択してください</option>
                    <option value="personal">個人</option>
                    <option value="academic">学業</option>
                    <option value="event">イベント</option>
                  </select>
                </div>

                <div className="event-form-group">
                  <label className="event-form-label">カラー *</label>
                  <div className="event-color-picker">
                    {predefinedColors.map(color => (
                      <button
                        key={color}
                        type="button"
                        className={`event-color-option ${newEvent.color === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewEvent({...newEvent, color: color})}
                      />
                    ))}
                  </div>
                </div>

                <div className="event-preview-section">
                  <div className="event-preview-title">プレビュー</div>
                  <div 
                    className="event-preview-card"
                    style={{ 
                      backgroundColor: newEvent.color,
                      color: isLightColor(newEvent.color) ? '#000' : '#fff'
                    }}
                  >
                    {newEvent.title || 'イベントタイトル'}
                  </div>
                </div>
              </div>

              <div className="event-modal-footer">
                <button 
                  type="button" 
                  className="event-modal-button event-modal-cancel"
                  onClick={() => {
                    setShowEventModal(false)
                    setEditingEvent(null)
                  }}
                >
                  キャンセル
                </button>
                <button 
                  type="submit" 
                  className="event-modal-button event-modal-submit"
                >
                  {editingEvent ? '更新' : '追加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 削除確認モーダル */}
      {showDeleteConfirmModal && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3 className="confirm-modal-title">イベントの削除</h3>
            <p className="confirm-modal-message">
              「{eventToDelete?.title}」を削除してもよろしいですか？
              <br />
              この操作は取り消せません。
            </p>
            <div className="confirm-modal-actions">
              <button 
                className="confirm-cancel-button"
                onClick={() => {
                  setShowDeleteConfirmModal(false)
                  setEventToDelete(null)
                }}
              >
                キャンセル
              </button>
              <button 
                className="confirm-delete-button"
                onClick={handleConfirmDelete}
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 削除完了通知モーダル */}
      {showNotificationModal && (
        <div className="modal-overlay">
          <div className="notification-modal">
            <h3 className="notification-modal-title">削除完了</h3>
            <p className="notification-modal-message">
              「{deletedEventTitle}」を削除しました。
            </p>
            <button 
              className="notification-button"
              onClick={() => {
                setShowNotificationModal(false)
                setDeletedEventTitle('')
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ログアウト確認モーダル */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-title">ログアウトの確認</h2>
            <p className="modal-message">本当にログアウトしますか？</p>
            <div className="modal-buttons">
              <button 
                className="modal-button modal-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                キャンセル
              </button>
              <button 
                className="modal-button modal-confirm"
                onClick={handleSignOut}
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from 'aws-amplify/auth'
import Link from 'next/link'
import Header from '../components/Header'
import { useEvents } from '../../contexts/EventContext'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', title: '期末試験のお知らせ', content: '来週から期末試験が始まります。試験時間割を確認してください。', date: '2024/4/1' },
    { id: 2, type: 'warning', title: 'レポート提出期限', content: '情報システム概論のレポート提出期限は今週金曜日までです。', date: '2024/4/3' },
    { id: 3, type: 'event', title: '学園祭実行委員会', content: '次回の実行委員会は4/5(金) 16:00から第2会議室で行います。', date: '2024/4/5' }
  ])

  const { events } = useEvents()

  const [tasks] = useState([
    { id: 1, title: "情報システム概論レポート", deadline: "2024/4/7", status: "pending", priority: "high" },
    { id: 2, title: "プロジェクト資料作成", deadline: "2024/4/18", status: "in-progress", priority: "medium" },
    { id: 3, title: "統計学の課題", deadline: "2024/4/22", status: "completed", priority: "low" }
  ])

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch (err) {
      router.push('/login')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'info': return 'info'
      case 'warning': return 'warning'
      case 'event': return 'event'
      default: return 'notifications'
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'info': return 'bg-blue-50 border-blue-200'
      case 'warning': return 'bg-yellow-50 border-yellow-200'
      case 'event': return 'bg-green-50 border-green-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  // イベントを日付でフィルタリングして最新の3つを取得
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)

  if (!user) return null

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <div className="content-grid">
          {/* お知らせセクション */}
          <section className="dashboard-section">
            <h2 className="section-title">お知らせ</h2>
            <div className="notifications-list">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${getNotificationColor(notification.type)}`}
                >
                  <div className="notification-icon">
                    <span className="material-icons">{getNotificationIcon(notification.type)}</span>
                  </div>
                  <div className="notification-content">
                    <h3>{notification.title}</h3>
                    <p>{notification.content}</p>
                    <span className="notification-date">{notification.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* サイドバー */}
          <div className="dashboard-sidebar">
            {/* 今後の予定 */}
            <section className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">今後の予定</h2>
                <Link href="/dashboard/calendar" className="view-all-link">
                  すべて表示
                  <span className="material-icons">arrow_forward</span>
                </Link>
              </div>
              <div className="upcoming-events">
                {upcomingEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="event-item"
                    style={{ borderLeftColor: event.color }}
                  >
                    <div className="event-icon">
                      <span className="material-icons">
                        {event.type === 'exam' ? 'school' : 
                         event.type === 'presentation' ? 'present_to_all' : 
                         'person'}
                      </span>
                    </div>
                    <div className="event-details">
                      <h3>{event.title}</h3>
                      <p>{event.date} {event.startTime}～{event.endTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* タスク */}
            <section className="dashboard-section">
              <h2 className="section-title">タスク</h2>
              <div className="tasks-list">
                {tasks.map(task => (
                  <div key={task.id} className="task-item">
                    <div className="task-status">
                      <span className={`status-badge ${getStatusColor(task.status)}`}>
                        {task.status === 'pending' ? '未着手' :
                         task.status === 'in-progress' ? '進行中' :
                         '完了'}
                      </span>
                      <span className={`priority-indicator ${getPriorityColor(task.priority)}`}>
                        <span className="material-icons">
                          {task.priority === 'high' ? 'priority_high' :
                           task.priority === 'medium' ? 'remove' :
                           'arrow_downward'}
                        </span>
                      </span>
                    </div>
                    <div className="task-content">
                      <h3>{task.title}</h3>
                      <p>期限: {task.deadline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 
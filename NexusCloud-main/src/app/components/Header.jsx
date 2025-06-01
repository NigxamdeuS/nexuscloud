"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'aws-amplify/auth'
import Link from 'next/link'

export default function Header() {
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('ログアウトエラー:', error)
    }
  }

  return (
    <>
      <nav className="dashboard-nav">
        <div className="nav-brand">学生ポータル</div>
        <div className="nav-links">
          <Link href="/dashboard" className="nav-link">
            ホーム
          </Link>
          <Link href="/dashboard/chat" className="nav-link">
            チャット
          </Link>
          <Link href="/dashboard/group" className="nav-link">
            グループ
          </Link>
          <Link href="/dashboard/calendar" className="nav-link">
            カレンダー
          </Link>
        </div>
        <div className="nav-actions">
          <button 
            className="icon-button"
            onClick={toggleTheme}
            aria-label="テーマ切り替え"
          >
            {isDark ? '🌞' : '🌙'}
          </button>
          <button 
            className="icon-button"
            onClick={() => setShowLogoutModal(true)}
            aria-label="ログアウト"
          >
            <span className="material-icons">logout</span>
          </button>
        </div>
      </nav>

      {/* ログアウト確認モーダル */}
      {showLogoutModal && (
        <div className="modal-backdrop" onClick={() => setShowLogoutModal(false)}>
          <div className="logout-modal" onClick={e => e.stopPropagation()}>
            <div className="logout-modal-icon">
              <span className="material-icons">logout</span>
            </div>
            <h2>ログアウト</h2>
            <p>本当にログアウトしますか？</p>
            <div className="logout-modal-buttons">
              <button 
                className="cancel-button"
                onClick={() => setShowLogoutModal(false)}
              >
                キャンセル
              </button>
              <button 
                className="logout-button"
                onClick={handleSignOut}
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 
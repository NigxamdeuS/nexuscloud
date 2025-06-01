"use client"

import { Amplify } from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore'
import { ThemeProvider } from 'next-themes'
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'
import awsconfig from '../aws-exports'
import '../styles/globals.css'
import { schema } from '../models/schema'
import { EventProvider } from '../contexts/EventContext'

// Amplifyの設定を修正
Amplify.configure({
  ...awsconfig,
  ssr: true,
  Auth: {
    mandatorySignIn: true,
    region: awsconfig.aws_cognito_region,
    userPoolId: awsconfig.aws_user_pools_id,
    userPoolWebClientId: awsconfig.aws_user_pools_web_client_id,
    identityPoolId: awsconfig.aws_cognito_identity_pool_id
  },
  API: {
    graphql_endpoint: awsconfig.aws_appsync_graphqlEndpoint,
    graphql_headers: async () => {
      const session = await fetchAuthSession()
      return {
        Authorization: session.tokens?.idToken?.toString()
      }
    }
  }
})

// DataStoreの初期化
const initializeDataStore = async () => {
  try {
    await DataStore.stop() // 既存のインスタンスを停止
    await DataStore.clear() // データをクリア
    await DataStore.configure(schema) // スキーマを設定
    await DataStore.start() // 新しいインスタンスを開始
  } catch (error) {
    console.error('DataStore初期化エラー:', error)
  }
}

// DataStoreの初期化を実行
if (typeof window !== 'undefined') {
  initializeDataStore()
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <EventProvider>
            {children}
          </EventProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 
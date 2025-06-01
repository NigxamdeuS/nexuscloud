"use client"

import { Amplify } from 'aws-amplify'
import { Authenticator, ThemeProvider, defaultTheme } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useRouter } from 'next/navigation'
import awsmobile from '../../aws-exports'

Amplify.configure(awsmobile)

// Amplify UIのテーマをカスタマイズ
const theme = {
  name: 'custom-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: '#f0f7ff',
          20: '#e1f0ff',
          40: '#99ccff',
          60: '#3399ff',
          80: '#0066cc',
          90: '#004d99',
          100: '#003366',
        },
      },
    },
    components: {
      authenticator: {
        router: {
          borderWidth: '0',
        },
      },
    },
  },
}

// 認証コンポーネントのカスタマイズ
const components = {
  Header() {
    return (
      <div className="auth-header">
        <h1>NexusCloud</h1>
        <p>安全なログインで始めましょう</p>
      </div>
    )
  },
  Footer() {
    return (
      <div className="auth-footer">
        <p>© 2024 NexusCloud. All rights reserved.</p>
      </div>
    )
  },
}

export default function Login() {
  const router = useRouter()

  return (
    <div className="login-container">
      <div className="auth-wrapper">
        <ThemeProvider theme={defaultTheme}>
          <Authenticator
            components={components}
            theme={theme}
            variation="modal"
            services={{
              async validateCustomSignUp(formData) {
                if (!formData.acknowledgement) {
                  return {
                    acknowledgement: '利用規約に同意する必要があります',
                  }
                }
              },
            }}
            initialState="signIn"
            signUpAttributes={['email', 'name', 'phone_number']}
            formFields={{
              signIn: {
                username: {
                  placeholder: 'メールアドレスを入力',
                  label: 'メールアドレス',
                  isRequired: true,
                },
                password: {
                  placeholder: 'パスワードを入力',
                  label: 'パスワード',
                  isRequired: true,
                },
              },
              signUp: {
                email: {
                  placeholder: 'メールアドレスを入力',
                  label: 'メールアドレス',
                  isRequired: true,
                },
                name: {
                  placeholder: '名前を入力',
                  label: '名前',
                  isRequired: true,
                },
                phone_number: {
                  placeholder: '電話番号を入力',
                  label: '電話番号',
                  isRequired: true,
                },
                acknowledgement: {
                  type: 'checkbox',
                  label: '利用規約に同意する',
                  isRequired: true,
                },
              },
            }}
          >
            {({ signOut, user }) => {
              if (user) {
                router.push('/dashboard')
                return null
              }
              return null
            }}
          </Authenticator>
        </ThemeProvider>
      </div>
    </div>
  )
} 
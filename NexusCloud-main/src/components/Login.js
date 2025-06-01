import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Googleログイン処理を実装
    // 成功後にホームページへリダイレクト
    navigate('/');
  };

  return (
    <div>
      <h1>ログイン</h1>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
}

export default Login; 
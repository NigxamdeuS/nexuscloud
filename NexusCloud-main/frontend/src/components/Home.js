import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // ユーザー情報の取得処理
  }, []);

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <div>
      <h1>ログイン成功！</h1>
      <p>{username}</p>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
}

export default Home; 
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // ログアウト処理を実装
  }, []);

  const handleBackToTop = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>ログアウトしました</h1>
      <button onClick={handleBackToTop}>トップへ戻る</button>
    </div>
  );
}

export default Logout; 
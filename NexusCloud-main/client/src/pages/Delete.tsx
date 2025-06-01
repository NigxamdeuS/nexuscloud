import React, { useState } from 'react';

interface Schedule {
  id: number;
  title: string;
  date: string;
}

function Delete() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: 1, title: "会議", date: "2025-02-15" },
    { id: 2, title: "ランチ", date: "2025-02-16" },
    { id: 3, title: "買い物", date: "2025-02-17" }
  ]);

  const deleteSchedule = (id: number) => {
    if (window.confirm("本当に削除しますか？")) {
      setSchedules(schedules.filter(schedule => schedule.id !== id));
    }
  };

  return (
    <div>
      <h2>予定一覧</h2>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule.id}>
            <span>{schedule.title} - {schedule.date}</span>
            <button onClick={() => deleteSchedule(schedule.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Delete; 
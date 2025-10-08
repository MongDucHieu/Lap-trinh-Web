import React, { useState, useEffect } from "react";

/* ---------------- Bài 1: Đếm số ---------------- */
function CounterDisplay({ value }) {
   return <h2>Giá trị hiện tại: {value}</h2>;
}
function CounterApp() {
   const [count, setCount] = useState(0);
   return (
      <div>
         <h1>Bài 1: Ứng dụng Đếm số</h1>
         <CounterDisplay value={count} />
         <button onClick={() => setCount(count - 1)}>-</button>
         <button onClick={() => setCount(count + 1)}>+</button>
      </div>
   );
}

/* ---------------- Bài 2: Danh sách công việc ---------------- */
function TodoItem({ task }) {
   return <li>{task}</li>;
}
function TodoApp() {
   const [task, setTask] = useState("");
   const [list, setList] = useState([]);

   const addTask = () => {
      if (task.trim() === "") return;
      setList([...list, task]);
      setTask("");
   };

   return (
      <div>
         <h1>Bài 2: Danh sách công việc</h1>
         <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
         />
         <button onClick={addTask}>Thêm</button>
         <ul>
            {list.map((item, index) => (
               <TodoItem key={index} task={item} />
            ))}
         </ul>
      </div>
   );
}

/* ---------------- Bài 3: Đổi màu nền ---------------- */
function ColorBox({ color }) {
   return (
      <div style={{ width: "150px", height: "150px", backgroundColor: color }} />
   );
}
function ColorApp() {
   const [color, setColor] = useState("");
   const colors = ["red", "green", "blue", "yellow"];
   return (
      <div>
         <h1>Bài 3: Ứng dụng đổi màu nền</h1>
         <ColorBox color={color} />
         {colors.map((c) => (
            <button key={c} onClick={() => setColor(c)}>
               {c}
            </button>
         ))}
      </div>
   );
}

/* ---------------- Bài 4: Thẻ sinh viên ---------------- */
function StudentCard({ name, age, className }) {
   const [show, setShow] = useState(false);
   return (
      <div>
         <h3>{name}</h3>
         <button onClick={() => setShow(!show)}>
            {show ? "Ẩn chi tiết" : "Xem chi tiết"}
         </button>
         {show && (
            <p>
               Tuổi: {age} - Lớp: {className}
            </p>
         )}
      </div>
   );
}
function StudentApp() {
   const students = [
      { name: "Mông Đức Hiếu", age: 19, className: "UDU03" },
      { name: "Phạm Tiến Đạt", age: 20, className: "UDU01" },
      { name: "Phạm Thành", age: 19, className: "CLC01" },
   ];
   return (
      <div>
         <h1>Bài 4: Thẻ thông tin sinh viên</h1>
         {students.map((s, i) => (
            <StudentCard key={i} {...s} />
         ))}
      </div>
   );
}

/* ---------------- Bài 5: Đồng hồ ---------------- */
function ClockDisplay({ time }) {
   return <h2>{time}</h2>;
}
function ClockApp() {
   const [time, setTime] = useState(new Date().toLocaleTimeString());
   useEffect(() => {
      const timer = setInterval(() => {
         setTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(timer);
   }, []);
   return (
      <div>
         <h1>Bài 5: Đồng hồ</h1>
         <ClockDisplay time={time} />
      </div>
   );
}

/* ---------------- App chính ---------------- */
export default function App() {
   return (
      <div>
         <CounterApp />
         <TodoApp />
         <ColorApp />
         <StudentApp />
         <ClockApp />
      </div>
   );
}

export default function App() {
   return (
      <div>
         CounterApp (
         TodoApp
         )
      </div>
   );
}
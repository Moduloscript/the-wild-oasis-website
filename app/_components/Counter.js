"use client";

import { useState } from "react";

export default function Counter({users}) {
  const [count, setCount] = useState(0);

    
    if(!users) return <p>Loading...</p>

    
  return (
      <>
          <p>There are {users.length}</p>
          <h1>{users.map((user) => (
              <div>{user.email }</div>
          ))}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </>
  );
}

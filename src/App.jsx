import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Books from './components/Books'
import SingleBook from './components/SingleBook'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'

function App() {
  const [token, setToken] = useState(null)

  return (
    <div>
      <nav style={{ display: 'flex', gap: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Library Catalog</Link>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <Link to="/account">My Account</Link>
        )}
      </nav>

      <main style={{ padding: '20px' }}>
        <h1>Book Buddy 📚</h1>
        
        <Routes>
        
          <Route path='/' element={<Books />} />
          <Route path='/books' element={<Books />} />

          <Route path='/books/:id' element={<SingleBook token={token} />} />

          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/register' element={<Register setToken={setToken} />} />

          <Route path='/account' element={<Account token={token} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
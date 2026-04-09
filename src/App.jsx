import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

// Importing our components
// Make sure these files exist in your src/components folder!
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
          {/* Home page - shows all books */}
          <Route path='/' element={<Books />} />
          <Route path='/books' element={<Books />} />

          {/* Details page for a single book */}
          <Route path='/books/:id' element={<SingleBook token={token} />} />

          {/* Authentication Pages */}
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/register' element={<Register setToken={setToken} />} />

          {/* Profile Page */}
          <Route path='/account' element={<Account token={token} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
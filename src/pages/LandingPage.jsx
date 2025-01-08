import { useState } from 'react'

function LandingPage({ onJoin }) {
  const [name, setName] = useState('')
  const [isJoined, setIsJoined] = useState(false)
  const [visitorName, setVisitorName] = useState('')

  const handleJoin = (name) => {
    setVisitorName(name)
    setIsJoined(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      handleJoin(name.trim())
    }
  }

  return (
    <div className="landing-page">
      <h1>Welcome to Interactive Zoo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <button type="submit">Join Zoo</button>
      </form>
    </div>
  )
}

export default LandingPage
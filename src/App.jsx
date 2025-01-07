import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import ZooRoom from './pages/ZooRoom'
import './App.css'

function App() {
  const [visitorName, setVisitorName] = useState('')
  const [isJoined, setIsJoined] = useState(false)

  const handleJoin = (name) => {
    setVisitorName(name)
    setIsJoined(true)
  }

  return (
    <div className="App">
      {!isJoined ? (
        <LandingPage onJoin={handleJoin} />
      ) : (
        <ZooRoom visitorName={visitorName} />
      )}
    </div>
  )
}

export default App
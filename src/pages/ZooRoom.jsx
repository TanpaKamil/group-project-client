import { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'

const SOCKET_URL = 'http://localhost:3000'

// { visitorName }
function ZooRoom() {
    const visitorName = localStorage.visitorName
    const [socket, setSocket] = useState(null)
    const [animalState, setAnimalState] = useState(null)
    const [visitors, setVisitors] = useState([])
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [interactionError, setInteractionError] = useState('');

    // Connect to socket when component mounts
    useEffect(() => {
        const newSocket = io(SOCKET_URL)
        setSocket(newSocket)

        // Join room when socket connects
        newSocket.on('connect', () => {
            newSocket.emit('join_room', visitorName)
        })

        // Socket event listeners
        newSocket.on('animal_state_update', (state) => {
            setAnimalState(state)
        })

        newSocket.on('visitor_joined', (visitorsList) => {
            setVisitors(visitorsList)
        })

        newSocket.on('chat_message', (message) => {
            setMessages(prev => [...prev, message])
        })

        newSocket.on('interaction_event', (event) => {
            setMessages(prev => [...prev, {
                type: 'system',
                message: `${visitorName} ${event.action} the animal!`
            }])
        })

        newSocket.on('interaction_failed', (message) => {
            setInteractionError(message);
            // Clear error after 2 seconds
            setTimeout(() => setInteractionError(''), 2000);
        });


        // Cleanup on unmount
        return () => {
            newSocket.close()
        }
    }, [visitorName])
    

    // Handle animal interactions
    const handleInteraction = (action) => {
        socket?.emit('interact_animal', action)
        
    }

    // Handle chat message submission
    const handleSendMessage = (e) => {
        e.preventDefault()
        if (newMessage.trim() && socket) {
            socket.emit('send_message', newMessage.trim())
            setNewMessage('')
        }
    }

    if (!animalState) return <div>Loading...</div>

    return (
        <div className="zoo-room">
            <div className="animal-section">
                <h2>Animal Status</h2>
                <div className="animal-states">
                    <p>Hungry: {animalState.isHungry ? '🔴' : '🟢'}</p>
                    <p>Thirsty: {animalState.isThirsty ? '🔴' : '🟢'}</p>
                    <p>Dirty: {animalState.isDirty ? '🔴' : '🟢'}</p>
                    <p>Has Waste: {animalState.hasWaste ? '🔴' : '🟢'}</p>
                    {animalState.isBusy && <p className="busy-status">Animal is busy! 🔄</p>}
                    {interactionError && <p className="error-message">{interactionError}</p>}
                </div>
                <div className="interaction-buttons">
                    <button
                        onClick={() => handleInteraction('feed')}
                        disabled={animalState.isBusy}
                    >
                        Feed
                    </button>
                    <button
                        onClick={() => handleInteraction('drink')}
                        disabled={animalState.isBusy}
                    >
                        Give Water
                    </button>
                    <button
                        onClick={() => handleInteraction('wash')}
                        disabled={animalState.isBusy}
                    >
                        Wash
                    </button>
                    <button
                        onClick={() => handleInteraction('clean')}
                        disabled={animalState.isBusy}
                    >
                        Clean Waste
                    </button>
                </div>
            </div>

            <div className="visitors-section">
                <h3>Current Visitors</h3>
                <ul>
                    {visitors.map(visitor => (
                        <li key={visitor}>{visitor}</li>
                    ))}
                </ul>
            </div>

            <div className="chat-section">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.type}`}>
                            {msg.type === 'user' ? (
                                <strong>{msg.user}: </strong>
                            ) : null}
                            {msg.message}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default ZooRoom
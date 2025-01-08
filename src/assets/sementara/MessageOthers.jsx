export default function MessageOthers({msg}) {
  return (
    <>
      <div className="chat chat-start mb-4 ml-8">
        <div>
          <div className="chat-header mb-1 text-lg text-gray-600">
            {msg.user}
          </div>
          <div className="chat-bubble bg-blue-100 text-gray-800 w-full">
            {msg.message}
          </div>
        </div>
      </div>
    </>
  );
}

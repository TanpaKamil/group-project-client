export default function MessageUser({ msg }) {
  return (
    <>
      <div className="chat chat-end mb-4">
        <div>
          <div className="chat-header mb-1 text-lg text-gray-600">
            {msg.user}
          </div>
          <div className="chat-bubble bg-[#009990] text-white w-full">
            {msg.message}
          </div>
        </div>
      </div>
    </>
  );
}

// src/components/ChatRoom.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import './ChatRoom.css';

const ChatRoom = () => {
  const [data, setData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://192.168.1.16:3000/data/dummy-conversation.json');
      setData(response.data.results);
    };
    fetchData();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() || file) {
      const message = {
        id: Date.now(),
        type: file ? "file" : "text",
        message: newMessage,
        sender: "customer@mail.com", // Example sender, could be dynamic
        fileUrl: file ? URL.createObjectURL(file) : null,
        fileType: file ? file.type.split("/")[0] : null, // e.g., "image", "video", "application"
        fileName: file ? file.name : null,
      };
      setData((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, message],
      }));
      setNewMessage("");
      setFile(null);
      setShowDialog(false); // Close the dialog after sending the message
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setShowDialog(true); // Open the dialog when a file is selected
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setFile(null);
    setNewMessage("");
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="chat-room">
      <header className="chat-header">
        <img src={data.room.image_url} alt={data.room.name} className="room-image" />
        <h2>{data.room.name}</h2>
      </header>
      
      <div className="chat-messages">
        {data.comments.map((comment) => (
          <ChatMessage key={comment.id} comment={comment} />
        ))}
      </div>

      <div className="chat-input">
        {/* Hidden file input */}
        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }} // Hide the default file input
          onChange={handleFileChange}
        />

        {/* Label acts as the custom file input */}
        <label htmlFor="file-upload" className="file-upload-label">
          <span role="img" aria-label="upload">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z"/></svg>
          </span> {/* Replace with your icon */}
        </label>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      {/* Dialog Box for File Preview and Message Input */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Preview</h3>

            {file && (
              <div className="file-preview">
                {file.type.startsWith("image") && (
                  <img src={URL.createObjectURL(file)} alt="preview" className="preview-image" />
                )}
                {file.type.startsWith("video") && (
                  <video controls className="preview-video">
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
                {file.type === "application/pdf" && (
                  <p>PDF: {file.name}</p>
                )}
              </div>
            )}

            <textarea
              placeholder="Add a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            <div className='button-group'>
                <button onClick={handleSendMessage}>Kirim Pesan</button>
                <button onClick={handleCloseDialog} className="close-dialog">Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;

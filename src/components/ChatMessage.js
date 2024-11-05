// src/components/ChatMessage.js
import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ comment }) => {
  const isOwnMessage = comment.sender === "customer@mail.com"; // Example sender

  return (
    <div className={`chat-message ${isOwnMessage ? 'own-message' : ''}`}>
      <p className="message-sender">{comment.sender}</p>
      
      {comment.type === "text" && (
        <div className="message-content">
            <p className="content-text">{comment.message}</p>
        </div>
      )}

      {comment.type === "file" && comment.fileType === "image" && (
        <div className="message-content">
            <img src={comment.fileUrl} alt={comment.fileName} className="content-image" />
            <p>{comment.message}</p>
        </div>
      )}

      {comment.type === "file" && comment.fileType === "video" && (
        <div className="message-content">
            <video controls className="content-video">
                <source src={comment.fileUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p>{comment.message}</p>
        </div>
      )}

      {comment.type === "file" && comment.fileType === "pdf" && (
        <div className="message-content">
            <div className="content-file">
                <a href={comment.fileUrl} target="_blank" rel="noopener noreferrer" className="file-name">
                {comment.fileName}
                </a>
            </div>
            <p>{comment.message}</p>
        </div>
      )}
      {comment.type === "file" && comment.fileType === "application" && (
        <div className="message-content">
            <a href={comment.fileUrl} target="_blank" rel="noopener noreferrer" className="content-file">
            {comment.fileName}
            </a>
            <p>{comment.message}</p>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;

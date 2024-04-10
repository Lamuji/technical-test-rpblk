import React, { useState } from 'react';
import './Modal.css';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostSubmit: (postContent: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onPostSubmit }) => {
  const [postText, setPostText] = useState('');

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onPostSubmit(postText);
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          maxLength={350}
        />
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
};

export default Modal;

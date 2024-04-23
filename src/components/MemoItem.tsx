import React, { useState } from 'react';
import { RiEdit2Line, RiSave2Line, RiCloseLine, RiDeleteBinLine } from 'react-icons/ri';

const MemoItem = ({ content, shortId, segment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editedShortId, setEditedShortId] = useState(shortId);
  const [editedSegment, setEditedSegment] = useState(segment);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Call the update hook here with editedContent, editedShortId, editedSegment
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Call the delete hook here
  };

  return (
    <div className="flex items-center border-b border-gray-200 py-2 mr-5">
      <div className="flex-1">
        {isEditing ? (
          <div className="flex space-x-1 items-center">
            <span className="pl-1">🔍</span>
            <input
              value={editedShortId}
              onChange={(e) => setEditedShortId(e.target.value)}
              className="border border-gray-300 rounded px-2 py-0.5 w-20"
            />
            <span className="pl-1">📝</span>
            <input
              value={editedSegment}
              onChange={(e) => setEditedSegment(e.target.value)}
              className="border border-gray-300 rounded px-2 py-0.5 w-28"
            />
            <span className="pl-1">💬</span>
            <input
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="border border-gray-300 rounded px-2 py-0.5 w-full"
            />
          </div>
        ) : (
          <div className="space-x-1">
            <span role="img" aria-label="short-id">🔍 <code>{shortId}</code></span>
            <span role="img" aria-label="category">📝 <code>{segment}</code></span>
            <span role="img" aria-label="content">💬 {content}</span>
          </div>
        )}
      </div>
      <div>
        {isEditing ? (
          <>
            <button onClick={handleSave} className="text-gray-600 hover:text-gray-800 p-1">
              <RiSave2Line />
            </button>
            <button onClick={() => setIsEditing(false)} className="text-gray-600 hover:text-gray-800 p-1">
              <RiCloseLine />
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="text-gray-600 hover:text-gray-800 p-1">
              <RiEdit2Line />
            </button>
            <button onClick={handleDelete} className="text-gray-600 hover:text-gray-800 p-1">
              <RiDeleteBinLine />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MemoItem;

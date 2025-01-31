import React from 'react';
import { InputWithButton } from '../common/InputWithButton';
import { SectionContainer } from '../common/SectionContainer';

interface Room {
  id: string;
  name: string;
}

interface RoomSectionProps {
  rooms: Room[];
  newRoomName: string;
  setNewRoomName: (name: string) => void;
  addRoom: () => void;
  removeRoom: (id: string) => void;
  editRoom: (id: string, name: string) => void;
}

export const RoomSection: React.FC<RoomSectionProps> = ({
  rooms,
  newRoomName,
  setNewRoomName,
  addRoom,
  removeRoom,
  editRoom,
}) => {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState("");

  const handleEdit = (room: Room) => {
    setEditingId(room.id);
    setEditValue(room.name);
  };

  const handleSaveEdit = (id: string) => {
    if (editValue.trim()) {
      editRoom(id, editValue.trim());
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <SectionContainer title="Rooms">
      <InputWithButton
        value={newRoomName}
        onChange={(e) => setNewRoomName(e.target.value)}
        onSubmit={addRoom}
        placeholder="Enter room name"
      />
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li key={room.id} className="bg-gray-700 p-2 rounded flex justify-between items-center">
            {editingId === room.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="bg-gray-600 text-white px-2 py-1 rounded flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveEdit(room.id);
                    } else if (e.key === 'Escape') {
                      handleCancelEdit();
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={() => handleSaveEdit(room.id)}
                  className="text-green-500 hover:text-green-400 px-2"
                >
                  ✓
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-500 hover:text-gray-400 px-2"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <span>{room.name}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleEdit(room)}
                    className="text-blue-500 hover:text-blue-400 px-2"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => removeRoom(room.id)}
                    className="text-red-500 hover:text-red-400 px-2"
                  >
                    ×
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
};

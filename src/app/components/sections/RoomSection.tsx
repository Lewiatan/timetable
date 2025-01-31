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
}

export const RoomSection: React.FC<RoomSectionProps> = ({
  rooms,
  newRoomName,
  setNewRoomName,
  addRoom,
  removeRoom,
}) => {
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
            <span>{room.name}</span>
            <button
              onClick={() => removeRoom(room.id)}
              className="text-red-500 hover:text-red-400"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
};

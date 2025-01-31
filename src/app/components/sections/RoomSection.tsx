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
}

export const RoomSection: React.FC<RoomSectionProps> = ({
  rooms,
  newRoomName,
  setNewRoomName,
  addRoom,
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
          <li key={room.id} className="bg-gray-700 p-2 rounded">
            {room.name}
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
};
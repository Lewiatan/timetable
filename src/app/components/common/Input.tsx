import React, { useRef } from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder: string;
}

const handleKeyPress = (
  e: React.KeyboardEvent<HTMLInputElement>,
  onSubmit: () => void,
  inputRef: React.RefObject<HTMLInputElement>
) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    onSubmit();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={(e) => handleKeyPress(e, onSubmit, inputRef)}
      placeholder={placeholder}
      className="w-full p-2 rounded bg-gray-700 text-white mb-4"
    />
  );
};
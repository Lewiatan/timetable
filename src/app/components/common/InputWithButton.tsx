import React, { useRef } from 'react';

interface InputWithButtonProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder: string;
  buttonText?: string;
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

export const InputWithButton: React.FC<InputWithButtonProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  buttonText = 'Add'
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-2 mb-4">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => handleKeyPress(e, onSubmit, inputRef)}
        placeholder={placeholder}
        className="flex-1 p-2 rounded bg-gray-700 text-white"
      />
      <button
        onClick={onSubmit}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        {buttonText}
      </button>
    </div>
  );
};
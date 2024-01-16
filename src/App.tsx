import React, { useState } from "react";

interface ChipProps {
  label: string;
  onDelete?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onDelete }) => {
  return (
    <div className="chip">
      <span className="chip-label">{label}</span>
      {onDelete && (
        <button className="chip-delete" onClick={onDelete}>
          &times;
        </button>
      )}
    </div>
  );
};

const ChipInput: React.FC = () => {
  const [value, setValue] = useState("");
  const [chips, setChips] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const text = value.trim();
      if (text.length > 0 && !chips.includes(text)) {
        setChips([...chips, text]);
        setValue("");
      }
    }
  };

  const handleChipDelete = (index: number) => {
    setChips(chips.filter((_, i) => i !== index));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredChips = searchValue
    ? chips.filter((chip) => chip.includes(searchValue))
    : chips;

  return (
    <div className="text-input-container">
      <input
        type="text"
        placeholder="Type and press Enter"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <div className="chips-container">
        {filteredChips.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onDelete={() => handleChipDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Chip Component</h1>
      <ChipInput />
    </div>
  );
};

export default App;

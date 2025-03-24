import React, { useState, useEffect, useRef } from "react";

interface DropdownProps {
  options?: string[]; // 옵셔널로 처리 가능
  selected?: number[]; // 옵셔널로 처리 가능
  onChange: (selected: number[]) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  selected = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (index: number) => {
    if (selected.includes(index)) {
      onChange(selected.filter((i) => i !== index));
    } else {
      onChange([...selected, index]);
    }
  };

  // 드랍다운 외부 클릭 시 닫기 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left text-base"
    >
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-between items-center w-[370px] px-4 py-2 bg-gray-700 text-white rounded-md"
      >
        {selected.length > 0
          ? selected.map((i) => options[i]).join(", ")
          : "선택된 장르"}
        <span className="ml-20">&#9662;</span>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md z-10 max-h-40 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 text-black ${
                selected.includes(index) ? "bg-gray-300" : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

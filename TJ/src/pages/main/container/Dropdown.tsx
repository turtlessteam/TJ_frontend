import { DropdownIcon } from "@/components/DropdownIcon";
import React, { useState, useEffect, useRef } from "react";

interface DropdownProps {
  options?: string[];
  selected?: number[];
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
    // 단일 선택을 위해 항상 [index]로 업데이트하고 드롭다운을 닫습니다.
    onChange([index]);
    setIsOpen(false);
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
      {isOpen && (
        <div className="absolute mt-2 w-[370px] bg-white shadow-lg rounded-md z-10 max-h-30 overflow-y-auto">
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
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-between items-center w-[380px] px-4 py-2 bg-gray-700 text-white rounded-md"
      >
        {selected.length > 0
          ? selected.map((i) => options[i]).join(", ")
          : "선택된 장르"}
        <span className="ml-20">
          <DropdownIcon />
        </span>
      </button>
    </div>
  );
};

export default Dropdown;

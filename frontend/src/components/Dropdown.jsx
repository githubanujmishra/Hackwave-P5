import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({selectedModel, setSelectedModel}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['PlaygroundAI', 'AbsoluteReality', 'stableDiffusion', 'runwayml', 'prompthero'];
  const dropdownRef = useRef(null);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionChange = (option) => {
    setSelectedModel(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700">Choose Model</label>
      <button
        className="dropdown-btn bg-[#6469ff] text-white px-4 md:px-8 py-2 rounded-md mt-1 md:mt-0 relative"
        onClick={toggleDropdown}
      >
        {selectedModel}
        <span className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isOpen ? 'rotate-180' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline-block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 15a1 1 0 01-.707-.293l-6-6a1 1 0 011.414-1.414L10 12.586l5.293-5.293a1 1 0 111.414 1.414l-6 6A1 1 0 0110 15z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="dropdown-content absolute bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10 w-full md:w-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-option cursor-pointer px-4 py-2 hover:bg-[#6469ff] hover:text-white"
              onClick={() => handleOptionChange(option)}
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

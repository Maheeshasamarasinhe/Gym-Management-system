import React from 'react';

const SearchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="search-model d-flex">
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="search-close-switch" onClick={onClose}>+</div>
        <form className="search-model-form">
          <input type="text" id="search-input" placeholder="Search here....." />
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
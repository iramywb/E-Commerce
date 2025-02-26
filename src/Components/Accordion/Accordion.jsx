// components/Accordion.jsx
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import PropTypes from "prop-types";

export default function Accordion({
  header,
  children,
  isOpen: controlledIsOpen,
  onToggle,
  className = "",
  headerClassName = "",
  contentClassName = "",
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = typeof controlledIsOpen !== "undefined";
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (!isControlled) {
      setInternalIsOpen(!isOpen);
    }
    onToggle?.(!isOpen);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      <div
        className={`flex items-center justify-between p-4 cursor-pointer ${headerClassName}`}
        onClick={handleToggle}
      >
        <div className="flex-1">{header}</div>
        {isOpen ? (
          <FaChevronUp className="w-5 h-5 ml-2 transition-transform" />
        ) : (
          <FaChevronDown className="w-5 h-5 ml-2 transition-transform" />
        )}
      </div>

      <div
        className={`transition-all overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className={`p-4 border-t ${contentClassName}`}>{children}</div>
      </div>
    </div>
  );
}

Accordion.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

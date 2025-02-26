import { HiOutlineShoppingBag } from "react-icons/hi";
// Loader.css
import "./Loader.css";

export default function Loader({ size }) {
  const texts = [
    "Processing request...",
    "Loading essential resources",
    "Retrieving data...",
    "Organizing content...",
    "Verifying details...",
  ];
  const containerClasses =
    size === "small"
      ? "relative bg-transparent text-current"
      : "fixed inset-0 bg-black bg-opacity-50 text-white";

  const iconSize = size === "small" ? "text-3xl" : "text-7xl";
  const shadowSize = size === "small" ? "w-8 h-2" : "w-16 h-4";

  return (
    <div
      role="status"
      className={`flex items-center justify-center z-50 ${containerClasses}`}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <HiOutlineShoppingBag
          className={`${
            size === "small" ? "animate-ping" : "animate-bounce"
          } ${iconSize}`}
        />{" "}
        <div
          className={`${shadowSize} bg-gray-300/70 rounded-tr-full rounded-bl-full skew-x-12`}
          style={{
            animation: "shadow 1.5s infinite",
            animationDuration: size === "small" ? "1s" : "1.5s",
          }}
        />
        {size !== "small" && (
          <div className="pt-4 font-semibold">
            {texts[Math.floor(Math.random() * texts.length)]}
          </div>
        )}
      </div>
    </div>
  );
}

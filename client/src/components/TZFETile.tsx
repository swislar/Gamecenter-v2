import React from "react";

interface TZFETileProps {
  number: number;
  className?: string;
  id?: string;
}

const colourClass = {
  2: "from-red-500 to-red-400",
  4: "from-orange-400 to-orange-300",
  8: "from-yellow-600 to-yellow-500",
  16: "from-purple-600 to-purple-500",
  32: "from-blue-400 to-blue-300",
  64: "from-lime-700 to-lime-600",
  128: "from-cyan-700 to-cyan-600",
  256: "from-beige-800 to-beige-700",
  512: "from-indigo-400 to-indigo-300",
  1024: "from-rose-500 to-rose-400",
  2048: "from-fuchsia-500 to-fuchsia-400",
};

export const TZFETile: React.FC<TZFETileProps> = ({
  number,
  className = "",
  id = "",
}) => {
  const colourType = colourClass[number] || "";

  return (
    <div
      id={id}
      className={`${
        className && className
      } flex w-14 h-14 items-center justify-center text-center text-xl border-2 border-gunmetal-gray shadow-md bg-gradient-to-tr text-shadow ${colourType}`}
    >
      {number}
    </div>
  );
};

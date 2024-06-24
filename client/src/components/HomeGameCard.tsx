import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface HomeGameCardProps {
  cardLogo: string;
  cardName: string;
  cardLink: string;
  BGFrom?: string;
  BGTo?: string;
}

export const HomeGameCard: React.FC<HomeGameCardProps> = ({
  cardLogo,
  cardName,
  cardLink,
  BGFrom = "",
  BGTo = "",
}) => {
  return (
    <motion.div
      whileTap={{ scale: 0.85 }}
      className="hover:scale-[1.03] hover:cursor-pointer ease-in duration-[100] px-2 py-1"
    >
      <Link to={cardLink} className="">
        <img
          src={cardLogo}
          alt={`${cardName} Logo`}
          className={`h-16 w-16 rounded-2xl md:h-36 md:w-36 md:rounded-4xl shadow-md shadow-gray-600 ${
            BGFrom || BGTo ? `p-1 bg-gradient-to-tr ${BGFrom} ${BGTo}` : ""
          }`}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center pt-1 text-xxs"
        >
          {cardName}
        </motion.p>
      </Link>
    </motion.div>
  );
};

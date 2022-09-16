import { motion } from "framer-motion";

export const Spinner = () => {
  return (
    <div className="h-screen grid">
      <motion.div
        animate={{ rotate: 360, borderRadius: ["50% 50%", "2% 50%"], x: 75 }}
        transition={{
          flip: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className="radial-progress text-[#92b7c3] self-center justify-self-center"
        style={{ "--value": 70 }}
      ></motion.div>
    </div>
  );
};

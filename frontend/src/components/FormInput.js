import { motion } from "framer-motion";

export const FormInput = ({
  name,
  type,
  placeholder,
  label,
  handleChange,
  invalid,
  err,
  value,
}) => {
  return (
    <>
      <div className="flex flex-col w-2/3 ">
        <label className="">{label}</label>
        <input
          type={type}
          name={name}
          className={`input input-bordered ${invalid}`}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => handleChange(e)}
          value={value}
        />
      </div>
      {err && (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "tween",
          }}
          className="text-error"
        >
          {err}
        </motion.p>
      )}
    </>
  );
};

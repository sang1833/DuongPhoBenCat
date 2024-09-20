const Input: React.FC<{
  title: string;
  placeholder: string;
  type: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}> = ({
  title,
  placeholder,
  type,
  id,
  value,
  onChange,
  required,
  disabled,
  error,
  className
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
        {title} {required && <span className="text-meta-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={
          "w-full rounded-lg border-[1.5px] border-gray-700 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" +
          `${error ? "border-red-500" : ""}` +
          ` ${className}`
        }
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;

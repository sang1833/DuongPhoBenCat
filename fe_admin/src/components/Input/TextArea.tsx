const TextArea: React.FC<{
  title: string;
  value: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}> = ({
  title,
  value,
  id,
  onChange,
  rows = 6,
  placeholder,
  required,
  disabled,
  className
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
        {title} {required && <span className="text-meta-1">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={
          "w-full rounded-lg border-[1.5px] border-gray-700 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" +
          ` ${className}`
        }
      ></textarea>
    </div>
  );
};

export default TextArea;

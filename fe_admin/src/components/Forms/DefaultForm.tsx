interface IFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
  formContent: React.ReactNode;
  formSubmitButton?: React.ReactNode;
}

const DefaultForm: React.FC<IFormProps> = ({
  handleSubmit,
  title,
  formContent,
  formSubmitButton
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {title && (
        <div>
          <h1>{title}</h1>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5">
        <div className="flex flex-col gap-6 xl:flex-row">{formContent}</div>

        <div>{formSubmitButton}</div>
      </form>
    </div>
  );
};

export default DefaultForm;

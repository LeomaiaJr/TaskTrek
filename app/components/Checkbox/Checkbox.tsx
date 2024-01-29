interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = ({ label, ...rest }: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        {...rest}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      {label && <label className="ml-2 text-sm text-gray-800">{label}</label>}
    </div>
  );
};

export default Checkbox;

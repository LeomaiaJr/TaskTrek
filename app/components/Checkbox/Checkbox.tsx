interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      {label && <label className="ml-2 text-sm text-gray-800">{label}</label>}
    </div>
  );
};

export default Checkbox;

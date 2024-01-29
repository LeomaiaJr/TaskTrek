interface FieldProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export const Field = ({
  label,
  name,
  required,
  error,
  children,
}: FieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>
        {label}
        {required && <span className="font-bold text-red">*</span>}:
      </label>
      {children}

      {error && <p className="text-red text-sm">{error}</p>}
    </div>
  );
};

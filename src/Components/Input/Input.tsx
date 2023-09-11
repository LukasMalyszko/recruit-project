import "./Form-component.scss";

export interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  name,
  onChange,
}) => {
  return (
    <input
      className="form-component__input"
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  );
};

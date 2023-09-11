export interface FormProps {
  formData: {
    firstName: string;
    lastName: string;
    department: string;
    salary: string;
  };
  onChange: (newData: any) => void;
}

export interface Worker {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  salary: string;
  currency: string;
}

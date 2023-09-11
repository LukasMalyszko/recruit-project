import React, { ReactElement, useState } from "react";
import { Input } from "../../Components/Input/Input";
import { Worker } from "../../Interfaces";

interface Props {
  onSearch: (
    searchTerm: string,
    selectedDepartments: string[],
    minSalary: number,
    maxSalary: number
  ) => void;
  searchResults: Worker[];
}

export const SearchWorker: React.FC<Props> = ({ onSearch }): ReactElement => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const department = e.target.value;
    setSelectedDepartments((prevDepartments) => {
      if (prevDepartments.includes(department)) {
        return prevDepartments.filter((dep) => dep !== department);
      } else {
        return [...prevDepartments, department];
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinSalary(e.target.value);
  };

  const handleMaxSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxSalary(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(
      searchTerm,
      selectedDepartments,
      parseFloat(minSalary),
      parseFloat(maxSalary)
    );
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-component">
        <fieldset>
          <legend>Search worker</legend>
          <Input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="form-component__checkboxes">
            <div>Departments</div>
            <label>
              <input
                type="checkbox"
                value="IT"
                checked={selectedDepartments.includes("IT")}
                onChange={handleCheckboxChange}
              />
              IT
            </label>
            <label>
              <input
                type="checkbox"
                value="Sales"
                checked={selectedDepartments.includes("Sales")}
                onChange={handleCheckboxChange}
              />
              Sales
            </label>
            <label>
              <input
                type="checkbox"
                value="Administration"
                checked={selectedDepartments.includes("Administration")}
                onChange={handleCheckboxChange}
              />
              Administration
            </label>
          </div>
          <div className="form-component__salary">
            <Input
              type="number"
              placeholder="Min Salary"
              value={minSalary}
              onChange={handleMinSalaryChange}
            />
            <Input
              type="number"
              placeholder="Max Salary"
              value={maxSalary}
              onChange={handleMaxSalaryChange}
            />
          </div>
          <button type="submit">Search</button>
        </fieldset>
      </form>
    </div>
  );
};

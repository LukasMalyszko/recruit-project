import { ReactElement, useEffect, useState } from "react";
import { Input } from "../../Components/Input/Input";
import { SearchWorker } from "../SearchWorker/SearchWorker";
import { Worker } from "../../Interfaces";
import { WorkersList } from "../WorkerList/WorkerList";
import "../WorkerList/WorkerList.scss";

export const AddWorkerForm: React.FC = (): ReactElement => {
  const [formData, setFormData] = useState<Worker>({
    id: 0,
    firstName: "",
    lastName: "",
    department: "",
    salary: "",
    currency: "USD",
  });

  const defaultWorkerList = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      department: "IT",
      salary: "3000",
      currency: "USD",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      department: "IT",
      salary: "3000.5",
      currency: "USD",
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Coleman",
      department: "Sales",
      salary: "9000",
      currency: "USD",
    },
    {
      id: 4,
      firstName: "Barbara",
      lastName: "O'Connor",
      department: "Sales",
      salary: "4000",
      currency: "USD",
    },
    {
      id: 5,
      firstName: "Adam",
      lastName: "Murphy",
      department: "Administration",
      salary: "2000",
      currency: "USD",
    },
  ];

  const [workersList, setWorkerList] = useState<Worker[]>(defaultWorkerList);

  const addWorker = (newWorker: Worker): void => {
    const updatedWorkerList = [...workersList, newWorker];
    setWorkerList(updatedWorkerList);
    localStorage.setItem("workersList", JSON.stringify(updatedWorkerList));
    setFormData({
      id: 0,
      firstName: "",
      lastName: "",
      department: "",
      salary: "",
      currency: "USD",
    });
  };

  const calculateTotalSalary = (workersList: Worker[]) => {
    let totalSalary = 0;
    workersList.forEach((worker) => {
      totalSalary += parseFloat(worker.salary);
    });
    return totalSalary;
  };

  const [totalSalary, setTotalSalary] = useState(0);

  const [searchResults, setSearchResults] = useState<Worker[]>([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const handleSearch = (
    searchTerm: string,
    selectedDepartments: string[],
    minSalary: number,
    maxSalary: number
  ) => {
    const filteredWorkers = workersList.filter((worker) => {
      const { firstName, lastName, department, salary } = worker;
      const workerSalary = parseFloat(salary);

      const matchesSearchTerm =
        firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lastName.toLowerCase().includes(searchTerm.toLowerCase());

      const withinSalaryRange =
        (!minSalary || workerSalary >= minSalary) &&
        (!maxSalary || workerSalary <= maxSalary);

      const isDepartmentSelected =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(department);

      return matchesSearchTerm && withinSalaryRange && isDepartmentSelected;
    });
    setTotalSalary(calculateTotalSalary(filteredWorkers));
    setSearchResults(filteredWorkers);
    setIsSearchPerformed(true);
  };

  const resetSearch = () => {
    setSearchResults([]);
    setIsSearchPerformed(false);
    setTotalSalary(calculateTotalSalary(workersList));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newWorker: Worker = { ...formData, id: workersList.length + 1 };
    console.log("Dane z formularza:", formData);
    addWorker(newWorker);
  };

  const removeLastWorker = () => {
    if (workersList.length > 0) {
      const updatedWorkersList = [...workersList];
      updatedWorkersList.pop();
      setWorkerList(updatedWorkersList);
      localStorage.setItem("workersList", JSON.stringify(updatedWorkersList));
    }
  };

  useEffect(() => {
    const storedWorkerList = JSON.parse(
      localStorage.getItem("workersList") || "[]"
    );
    setWorkerList(storedWorkerList);
  }, []);

  useEffect(() => {
    const initialTotalSalary = calculateTotalSalary(workersList);
    setTotalSalary(initialTotalSalary);
  }, [workersList]);

  return (
    <>
      <SearchWorker onSearch={handleSearch} searchResults={searchResults} />
      {isSearchPerformed ? (
        <>
          <button onClick={resetSearch}>Reset Search</button>
          <WorkersList worker={searchResults} totalSalary={totalSalary} />
        </>
      ) : (
        <WorkersList worker={workersList} totalSalary={totalSalary} />
      )}
      <button className="remove" onClick={removeLastWorker}>Remove Last Worker</button>
      <form className="form-component" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Add Worker</legend>
          <Input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            name="firstName"
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            name="lastName"
          />
          <Input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={handleInputChange}
            name="department"
          />
          <Input
            type="text"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleInputChange}
            name="salary"
          />
          <button className="add" type="submit">Add Worker</button>
        </fieldset>
      </form>
    </>
  );
};

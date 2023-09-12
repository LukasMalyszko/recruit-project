import { ReactElement, useEffect, useState } from "react";
import { Input } from "../../Components/Input/Input";
import { SearchWorker } from "../SearchWorker/SearchWorker";
import { Worker } from "../../Interfaces";
import { WorkersList } from "../WorkerList/WorkerList";
import "../WorkerList/WorkerList.scss";
import { useDispatch, useSelector } from "react-redux";
import { addWorker } from "../../Redux/workerSlice";

export const AddWorkerForm: React.FC = (): ReactElement => {
  const [formData, setFormData] = useState<Worker>({
    id: 0,
    firstName: "",
    lastName: "",
    department: "",
    salary: "",
    currency: "USD",
  });

  const workersList = useSelector((state: any) => state.workers.value);

  const dispatch = useDispatch();

  const departments = ["IT", "Sales", "Administration"];

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
    const filteredWorkers = workersList.filter((worker: any) => {
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

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newWorker: Worker = { ...formData, id: workersList.length + 1 };
    dispatch(addWorker(newWorker));
    console.log("Nowy pracownik:", formData);
    setFormData({
      id: 0,
      firstName: "",
      lastName: "",
      department: "",
      salary: "",
      currency: "USD",
    });
  };

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
          <select
            name="department"
            value={formData.department}
            onChange={(e) => handleSelectChange(e)}
          >
            <option value="">Select department...</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
          <Input
            type="text"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleInputChange}
            name="salary"
          />
          <button className="add" type="submit">
            Add Worker
          </button>
        </fieldset>
      </form>
    </>
  );
};

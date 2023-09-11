import React, { ReactElement } from "react";

import { Worker } from "../../Interfaces";

interface Props {
  worker: Worker[];
  totalSalary: number;
}

export const WorkersList: React.FC<Props> = ({ worker, totalSalary }): ReactElement => {
  return (
    <div className="workers-component">
      <div className="workers-component__info ">
        <div className="workers-component__cell head id">ID</div>
        <div className="workers-component__cell head">Name</div>
        <div className="workers-component__cell head">Surname</div>
        <div className="workers-component__cell head">Department</div>
        <div className="workers-component__cell head">Salary</div>
      </div>
      {worker.map((worker) => (
        <div className="workers-component__info" key={worker.id}>
          <div className="workers-component__cell id">{worker.id}</div>
          <div className="workers-component__cell">{worker.firstName}</div>
          <div className="workers-component__cell">{worker.lastName}</div>
          <div className="workers-component__cell">{worker.department}</div>
          <div className="workers-component__cell">
            {worker.salary + " " + worker.currency}
          </div>
        </div>
      ))}
      <div className="workers-component__info summary">
        <div className="workers-component__cell">Summary</div>
        <div className="workers-component__cell summary">{`${totalSalary} USD`}</div>
      </div>
    </div>
  );
};

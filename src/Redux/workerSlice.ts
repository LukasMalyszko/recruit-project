import { createSlice } from "@reduxjs/toolkit";
// import { Worker } from "../Interfaces";
import { defaultWorkerList } from "../defaultWorkerList";

// interface WorkerPayload {
//     newWorker: Worker;
//   }




const workerSlice = createSlice({
    name: "worker",
    initialState: { value: defaultWorkerList },
    reducers: {
      addWorker: (state, action) => {
        state.value.push(action.payload)
      }
    },
  });

  export const { addWorker } = workerSlice.actions;
  export default workerSlice.reducer;

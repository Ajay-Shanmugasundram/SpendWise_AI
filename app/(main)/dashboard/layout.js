import React, { Suspense } from "react";
import Dashboard from "./page";
import { BarLoader } from "react-spinners";

const DashboardLayout = () => {
  return (
    <div>
      <div className="px-5">
        <h1 className=" text-6xl font-bold gradient-title mb-5 mx-auto">
          Dashboard
        </h1>
      </div>
      <Suspense
        fallback={
          <BarLoader
            className="mt-4"
            width={"100%"}
            color="#48C5B3"
          ></BarLoader>
        }
      >
        <Dashboard></Dashboard>
      </Suspense>
    </div>
  );
};

export default DashboardLayout;

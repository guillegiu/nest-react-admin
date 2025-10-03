import React from 'react';
import { useQuery } from 'react-query';

import UpdateProfile from '../components/dashboard/UpdateProfile';
import Layout from '../components/layout';
import statsService from '../services/StatsService';

export default function Dashboard() {
  const { data, isLoading } = useQuery('stats', statsService.getStats);

  return (
    <Layout>
      <div className="main-header">
        <h1 className="font-semibold text-2xl text-gray-700">Dashboard</h1>
      </div>
      <div className="main-content">
        <div className="flex flex-col gap-6">
          {!isLoading ? (
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="card shadow text-white bg-red-500 flex-1">
                <h1 className="font-semibold sm:text-4xl text-center mb-3">
                  {data.numberOfUsers}
                </h1>
                <p className="text-center sm:text-lg font-semibold">Users</p>
              </div>
              <div className="card shadow text-white bg-red-600 flex-1">
                <h1 className="font-semibold sm:text-4xl mb-3 text-center">
                  {data.numberOfCourses}
                </h1>
                <p className="text-center sm:text-lg font-semibold">Courses</p>
              </div>
              <div className="card shadow text-white bg-red-700 flex-1">
                <h1 className="font-semibold sm:text-4xl mb-3 text-center">
                  {data.numberOfContents}
                </h1>
                <p className="text-center sm:text-lg font-semibold">Contents</p>
              </div>
            </div>
          ) : null}

          <UpdateProfile />
        </div>
      </div>
    </Layout>
  );
}

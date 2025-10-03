import React from 'react';

import UpdateProfile from '../components/dashboard/UpdateProfile';
import Layout from '../components/layout';

export default function Profile() {
  return (
    <Layout>
      <div className="main-header">
        <h1 className="font-semibold text-2xl text-gray-700">Profile Settings</h1>
      </div>
      <div className="main-content">
        <UpdateProfile />
      </div>
    </Layout>
  );
}

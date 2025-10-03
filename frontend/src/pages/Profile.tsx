import React from 'react';

import UpdateProfile from '../components/dashboard/UpdateProfile';
import Layout from '../components/layout';
import useTranslation from '../hooks/useTranslation';

export default function Profile() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="main-header">
        <h1 className="font-semibold text-2xl text-gray-700">{t('profile.title')}</h1>
      </div>
      <div className="main-content">
        <UpdateProfile />
      </div>
    </Layout>
  );
}

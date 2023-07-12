'use client';

import DashboardContent from '@/components/DashboardPage/DashboardContent';
import { DefaultLayout } from '@/components/PageLayout';
import React, { useState } from 'react';

const page = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <DefaultLayout>
      <DashboardContent />
    </DefaultLayout>
  );
};

export default page;

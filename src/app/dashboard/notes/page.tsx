'use client';

import NoteContent from '@/components/NotePage/NoteContent';
import { DefaultLayout } from '@/components/PageLayout';
import React from 'react';

const Notes = () => {
  return (
    <DefaultLayout>
      <NoteContent />
    </DefaultLayout>
  );
};

export default Notes;

import Home from '@/components/Home';

import React from 'react';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Page',
  description: '主页',
}

function Page() {
    return (
        <Home />
    );
}

export default Page;
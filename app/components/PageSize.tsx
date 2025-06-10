'use client';

import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const pageSizes: string[] = [
  '10',
  '20',
  '50',
  '100'
];

const PageSize = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get('pageSize') || '10'}
      onValueChange={(pageSize) => {
        const params = new URLSearchParams();
        if (pageSize) params.append('pageSize', pageSize);
        if (searchParams.get('orderBy'))
          params.append('orderBy', searchParams.get('orderBy')!);
        if (searchParams.get('orderDirection'))
          params.append('orderDirection', searchParams.get('orderDirection')!);

        const query = params.size ? '?' + params.toString() : '';
        router.push('/issues/list' + query);
      }}
    >
      <Select.Trigger placeholder="Select page size..." />
      <Select.Content>
        {pageSizes.map((pageSize) => (
          <Select.Item
            key={pageSize}
            value={pageSize}
          >
            {pageSize}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default PageSize;

'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { GET_ENTITIES } from './graphql/queries';
import { useRouter } from 'next/navigation';

import mapData from '././utli/mapData';
import { Button } from '@/components/ui/button';
import { Edit, Plus } from 'lucide-react';
import Link from 'next/link';

const ButtonRenderer = ({ data }: { data: { id: string } }) => {
  return (
    <Link href={`/ContactCompanyEditForm/${data?.id}`}>
      <Button variant="ghost">
        <Edit className="h-4 w-4" />
      </Button>
    </Link>
  );
};

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_ENTITIES);
  const [rowData, setRowData] = React.useState([]);
  const router = useRouter();

  const [columnDefs] = React.useState([
    { headerName: 'ID', field: 'id', hide: true },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
    { headerName: 'Industry', field: 'industry' },
    {
      headerName: 'Contact Email',
      field: 'contactEmail',
      sortable: true,
      filter: true,
    },
    { headerName: 'Type', field: 'type' },
    {
      headerName: '',
      field: 'actions',
      cellRenderer: ButtonRenderer,
      cellRendererParams: {
        onClick: () => console.log('test'),
      },
    },
  ]);
  React.useEffect(() => {
    // Refetch data when the component mounts or when the router changes
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  React.useEffect(() => {
    if (data && data.getEntities) {
      const mappedData = mapData(data.getEntities);
      setRowData(mappedData as any);
    }
  }, [data]);
  console.log('rowDatarowData', rowData);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      className="ag-theme-alpine  container mx-auto"
      style={{ height: 400, width: '100%' }}
    >
      <h2 className="text-2xl font-semibold mb-4">
        Display Contacts and Companies
      </h2>
      <Link href={`/ContactCompanyAddForm`}>
        <Button
          variant="ghost"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold  "
        >
          <Plus className="h-4 w-4  " />
        </Button>
      </Link>
      <div
        className="ag-theme-alpine"
        style={{ height: '500px', width: '100%' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs as any}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import {
  CreateCompanyInput,
  CreateContactInput,
  EntityType,
} from '../../../api/graphql/types';
import { GET_ENTITY, UPDATE_ENTITY } from '../../../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import ContactCompanyForm from '../../../_components/ContactCompanyForm';
import MyDialog from '../../../_components/Dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
export default function ContactCompanyEditForm({ params }: { params: any }) {
  const router = useRouter();

  let [isOpen, setIsOpen] = React.useState(false);
  let [modalTitle, setModalTitle] = React.useState('Operation succeeded!');

  const { data, loading, error } = useQuery(GET_ENTITY, {
    variables: { id: params?.id },
  });
  const [updateEntity] = useMutation(UPDATE_ENTITY);
  const entityType = data?.getEntity?.__typename?.toUpperCase();

  const onSubmit = async (
    formData: CreateContactInput | CreateCompanyInput
  ) => {
    try {
      const updatedData = {
        id: params?.id,
        ...formData,
        entityType: entityType,
      };
      await updateEntity({
        variables: {
          input: {
            ...updatedData,
          },
        },
      });
      setIsOpen(true);
      setModalTitle('Operation succeeded!');
    } catch (error) {
      console.log('error', error);
      setModalTitle('Operation failed. Please try again.');
    } finally {
      setIsOpen(true);
    }
  };
  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-8">
      <MyDialog
        title={modalTitle}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={() => {
          router.push('/');
        }}
      />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Modify Information</CardTitle>
          <CardDescription>
            Adjust the information for this{' '}
            <span className="font-bold blue-500">
              {entityType === EntityType.CONTACT ? 'contact' : 'company'}
            </span>{' '}
            . Edit the existing data to ensure it is accurate and up-to-date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactCompanyForm
            defaultValues={data?.getEntity}
            entityType={entityType}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}

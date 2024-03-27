import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormInput from '@/app/_components/FormInput';
import {
  CreateCompanyInput,
  CreateContactInput,
  EntityType,
} from '../api/graphql/types';

interface Props {
  defaultValues: {};
  entityType: EntityType;
  onSubmit: (
    formData: CreateContactInput | CreateCompanyInput
  ) => Promise<void>;
}

export default function ContactCompanyForm({
  entityType,
  onSubmit,
  defaultValues,
}: Props) {
  const form = useForm({
    resolver: zodResolver(getFormSchema(entityType)),
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const handleSubmit: any = (
    formData: CreateContactInput | CreateCompanyInput
  ) => {
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormInput
          control={form.control}
          name="name"
          label="Name"
          placeholder={`Enter name`}
        />
        {/* Render other form fields based on the entityType */}
        {entityType === EntityType.CONTACT ? (
          <>
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter email"
            />
            <FormInput
              control={form.control}
              name="phone"
              label="Phone"
              placeholder="Enter phone"
            />
          </>
        ) : (
          <>
            <FormInput
              control={form.control}
              name="industry"
              label="Industry"
              placeholder="Enter industry"
            />
            <FormInput
              control={form.control}
              name="contactEmail"
              label="Contact Email"
              placeholder="Enter contact email"
            />
          </>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function getFormSchema(entityType: EntityType) {
  return entityType === EntityType.CONTACT ? ContactSchema : CompanySchema;
}

// Define the form schema for contact
const ContactSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  phone: z.string().optional(),
});

// Define the form schema for company
const CompanySchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  industry: z.string().min(2, {
    message: 'Industry must be at least 2 characters.',
  }),
  contactEmail: z
    .string()
    .email({
      message: 'Invalid email address.',
    })
    .optional(),
});

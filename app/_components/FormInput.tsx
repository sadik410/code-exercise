import { FC } from 'react';
import { Control } from 'react-hook-form';
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
}

const FormInput: FC<FormInputProps> = ({
  control,
  name,
  label,
  placeholder,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} {...field} defaultValue="" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormInput;

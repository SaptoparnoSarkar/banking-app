import { paymentFormSchema } from '@/lib/utils'
import React from 'react'
import { Control, FieldPath } from 'react-hook-form';
import z from 'zod';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from "./ui/input";
import { Textarea } from './ui/textarea';

const formSchema = paymentFormSchema();

interface PaymentInputProps{
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
    placeholder: string;
    description?: string;
    inputType?: "input" | "textarea"

}

const PaymentInput = ({control, name, label, placeholder, description="", inputType = "input"}:PaymentInputProps) => {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="border-t border-gray-200">
          <div className="payment-transfer_form-item pb-6 pt-5">
            <div className="payment-transfer_form-content">
              <FormLabel className="text-14 font-medium text-gray-700">
                {label}
              </FormLabel>
              <FormDescription className="text-12 font-normal text-gray-600">
                {description}
              </FormDescription>
            </div>
            <div className="flex w-full flex-col">
              <FormControl>
                {inputType === "textarea" ? (
                <Textarea
                  placeholder={placeholder}
                  className="input-class"
                  {...field}
                />
                ): (
                    <Input 
                        placeholder={placeholder}
                        className="input-class"
                        {...field}
                    />
                )}
              </FormControl>
              <FormMessage className="text-12 text-red-500" />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}

export default PaymentInput

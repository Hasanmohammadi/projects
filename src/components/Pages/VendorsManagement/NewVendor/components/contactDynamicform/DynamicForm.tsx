/* eslint-disable react/jsx-props-no-spreading */
import { PlusCircle, Trash } from 'react-feather';
import { Control, FieldErrors, useFieldArray } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form/dist/types/form';

import { VendorFormInputsI } from '../../NewVendor';
import ContactDynamicFormContainer from './ContactDynamicForm.style';

interface DynamicFormI {
  errors: FieldErrors<VendorFormInputsI>;
  control: Control<VendorFormInputsI, any> | undefined;
  register: UseFormRegister<VendorFormInputsI>;
}

export default function DynamicForm({
  control,
  register,
  errors,
}: DynamicFormI) {
  const { fields, append, remove } = useFieldArray<VendorFormInputsI>({
    name: 'contacts',
    control,
  });

  return (
    <ContactDynamicFormContainer>
      {fields.map((field, index) => (
        <div key={field.id}>
          <section
            className="section flex flex-wrap gap-6 relative"
            key={field.id}
          >
            <div className="mb-5">
              <p className="text-sm font-medium mb-2 text-gray-700">
                Name
              </p>
              <input
                placeholder="Name"
                defaultValue={field.name}
                {...register(`contacts.${index}.name` as const, {
                  required: true,
                })}
              />
              <p className="w-full text-center text-red-600 mt-0.5 text-sm">
                {errors?.contacts?.[index]?.name?.message}
              </p>
            </div>
            <div className="mb-5">
              <p className="text-sm font-medium mb-2 text-gray-700">
                Phone number
              </p>
              <div>
                <div className="relative flex items-center">
                  <input
                    className="phone-number-input"
                    placeholder="+1 (555) 000-0000"
                    {...register(`contacts.${index}.phone` as const)}
                    defaultValue={field.name}
                  />
                </div>
                <p className="w-full text-center text-red-600 mt-0.5 text-sm">
                  {errors?.contacts?.[index]?.phone?.message}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              {(index !== fields.length - 1 || fields.length > 1) && (
                <button type="button" onClick={() => remove(index)}>
                  <Trash className="mx-2" size={20} color="#667085" />
                </button>
              )}
              {index === fields.length - 1 && (
                <button
                  type="button"
                  onClick={() =>
                    append({
                      name: '',
                      countryCode: '',
                      phone: '',
                    })
                  }
                >
                  <PlusCircle className="ml-2" size={20} color="#667085" />
                </button>
              )}
            </div>
          </section>
        </div>
      ))}
    </ContactDynamicFormContainer>
  );
}

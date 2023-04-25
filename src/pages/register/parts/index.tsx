import React from 'react';
import { useForm } from 'react-hook-form';

import { usePartsStore } from '@/store/parts';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome deve conter pelo menos 3 caracteres')
    .max(255),
  price: z
    .number()
    .min(0.1, 'O preço deve ser maior que 0')
    .transform((value) => Number(value)),
});

type FormProps = z.infer<typeof formSchema>;

const register: React.FC = () => {
  const { addPart } = usePartsStore((state) => state);
  const state = usePartsStore(({ state }) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
    },
  });
  console.log('🚀 ~ file: index.tsx:36 ~ watch:', watch());

  const onSubmit = (dataForm: FormProps) => {
    console.log('🚀 ~ file: index.tsx:19 ~ data:', dataForm);
    const newDataForm = {
      id: nanoid(),
      ...dataForm,
    };
    addPart(newDataForm);
    reset();
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-blue-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <h1 className="text-2xl font-bold text-center">Register parts</h1>

        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="name">Nome: </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`border rounded ${errors?.name && 'border-red-500'}`}
            />
          </div>
          {errors?.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="price">Preço: </label>
            <input
              id="price"
              {...register('price', { valueAsNumber: true })}
              type="number"
              step={0.01}
              className={`border rounded ${errors?.price && 'border-red-500'}`}
            />
          </div>
          {errors?.price && (
            <span className="text-red-500">{errors?.price.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="font-semibold text-white rounded bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50"
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
};

export default register;

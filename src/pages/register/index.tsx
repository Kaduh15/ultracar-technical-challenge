import React from 'react';
import { useForm } from 'react-hook-form';

import { useUsersStore } from '@/store/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { TService } from '../../../@types';

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, 'O nome deve conter pelo menos 3 caracteres')
      .max(255),
    role: z
      .enum(['client', 'mechanic'], {
        errorMap: () => {
          return {
            message: 'Selecione uma opção',
          };
        },
      })
      .default('client'),
    car: z.string().default(''),
  })
  .refine(
    (fields) => {
      if (fields.role == 'mechanic') {
        return true;
      }

      return fields.car.length >= 3;
    },
    {
      message: 'O carro deve conter pelo menos 3 caracteres',
      path: ['car'],
    },
  )
  .transform((fields) => {
    if (fields.role === 'client') {
      return {
        name: fields.name,
        role: fields.role,
        car: fields.car,
      };
    }

    return {
      name: fields.name,
      role: fields.role,
      services: [] as TService[],
    };
  });

type FormProps = z.infer<typeof formSchema>;

const register: React.FC = () => {
  const { addUser } = useUsersStore((state) => state);
  const state = useUsersStore(({ state }) => state);
  console.log('🚀 ~ file: index.tsx:62 ~ state:', state);
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
      role: 'client',
    },
  });

  const onSubmit = (dataForm: FormProps) => {
    console.log('🚀 ~ file: index.tsx:19 ~ data:', dataForm);
    const newDataForm = {
      id: nanoid(),
      ...dataForm,
    };
    addUser(newDataForm);
    reset();
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-blue-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

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
        <div className="flex flex-col">
          <div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="client"
                {...register('role')}
                value="client"
              />
              <label
                htmlFor="client"
                className={`${errors?.role && 'text-red-500'}`}
              >
                Cliente
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="mechanic"
                {...register('role')}
                value="mechanic"
              />
              <label
                htmlFor="mechanic"
                className={`${errors?.role && 'text-red-500'}`}
              >
                Mecânico
              </label>
            </div>
          </div>

          {errors?.role && (
            <span className="text-red-500">{errors.role.message}</span>
          )}
        </div>

        {watch('role') === 'client' && (
          <div>
            <div>
              <label htmlFor="car">Carro: </label>
              <input
                type="text"
                id="car"
                {...register('car')}
                className={`border rounded ${errors?.name && 'border-red-500'}`}
              />
            </div>
            {errors?.car && (
              <span className="text-red-500">{errors.car.message}</span>
            )}
          </div>
        )}

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

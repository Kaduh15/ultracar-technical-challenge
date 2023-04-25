import { GetServerSideProps } from 'next';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { usePartsStore } from '@/store/parts';
import { useUsersStore } from '@/store/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { TClient, TPart } from '../../../@types';

const FormPropsSchema = z.object({
  mechanicId: z.string().nonempty('Selecione um colaborador'),
  parts: z.array(
    z.object({
      partId: z.string().nonempty('Selecione uma peça'),
      quantity: z.number().min(1, 'Quantidade deve ser maior que 0'),
    }),
  ),
});

type FormProps = z.infer<typeof FormPropsSchema>;

type ServicesProps = {
  clientId: string;
};

const services: React.FC<ServicesProps> = ({ clientId }) => {
  const { getUserById, getMechanics, addService } = useUsersStore(
    (store) => store,
  );
  const { state: parts } = usePartsStore((store) => store);
  const client = getUserById(clientId) as TClient;
  const mechanics = getMechanics();

  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormProps>({
    mode: 'onChange',
    resolver: zodResolver(FormPropsSchema),
  });
  // console.log('🚀 ~ file: [clientId].tsx:46 ~ watch:', watch('parts'));

  const priceTotal = watch('parts')?.reduce((acc, part) => {
    const { quantity } = part;
    const partPrice = parts.find((p) => p.id === part.partId)?.price ?? 1;
    return acc + quantity * partPrice;
  }, 0);

  const onSubmit = async (data: FormProps) => {
    console.log('🚀 ~ file: [clientId].tsx:56 ~ onSubmit ~ data:', data);
    const partsIds = data.parts.map((part) => part.partId);
    const newParts = parts.filter((part) => partsIds.includes(part.id));

    addService(data.mechanicId, {
      client,
      price: priceTotal,
      parts: newParts,
      initialDate: new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
        new Date(),
      ),
    });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parts',
  });

  const addParts = () => {
    append({ partId: '', quantity: 0 });
  };

  return (
    <>
      <h1>client: {client?.name}</h1>
      <p>Carro: {client?.car}</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center bg-blue-950 p-4 rounded-lg gap-4 w-4/5"
      >
        <select {...register('mechanicId')} placeholder="Escolha o mecânico">
          {mechanics.map((mechanic) => (
            <option
              key={mechanic.id}
              value={mechanic.id}
              label={mechanic.name}
            />
          ))}
        </select>

        <button onClick={addParts}>Adicionar peça</button>

        {fields.map((field, index) => (
          <div key={field.id}>
            <select id="" {...register(`parts.${index}.partId`)}>
              {parts.map((part) => (
                <option key={part.id} value={part.id} label={part.name} />
              ))}
            </select>
            <input
              type="number"
              id=""
              {...register(`parts.${index}.quantity`, { valueAsNumber: true })}
            />
            <button onClick={() => remove(index)}>Remover Peça</button>
          </div>
        ))}

        <p className="font-bold text-white">
          Price: <span>R${priceTotal}</span>
        </p>

        <button type="submit">Inciar Reparo</button>
      </form>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      clientId: query.clientId,
    },
  };
};

export default services;

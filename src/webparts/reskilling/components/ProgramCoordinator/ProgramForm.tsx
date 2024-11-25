import * as React from 'react';
import { useForm } from 'react-hook-form';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Config } from '../../config/config';
import { getSP } from '../../../..';

interface IProgramFormProps {
  context: WebPartContext;
}

interface IProgramFormInputs {
  Title: string;
  StartDate: string;
  EndDate: string;
  IsActive: boolean;
}

const ProgramForm: React.FC<IProgramFormProps> = ({ context }) => {
  const { register, handleSubmit, reset } = useForm<IProgramFormInputs>();

  const onSubmit = async (data: IProgramFormInputs) => {
    try {
      const sp = getSP(context);
      const PROGRAMS_LIST = Config.LIST_NAMES.PROGRAMS;

      await sp.web.lists.getByTitle(PROGRAMS_LIST).items.add(data);
      alert('Program created successfully');
      reset();
    } catch (error) {
      console.error('Error creating program:', error);
      alert('Error creating program');
    }
  };

  return (
    <div>
      <h2>Create New Program</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>Program Name</div>
          <input {...register('Title', { required: true })} />
        </div>
        <div>
          <div>Start Date</div>
          <input type="date" {...register('StartDate', { required: true })} />
        </div>
        <div>
          <div>End Date</div>
          <input type="date" {...register('EndDate', { required: true })} />
        </div>
        <div>
          <div>
          
            <input type="checkbox" {...register('IsActive')} />
            <div>Active</div>
          </div>
        </div>
        <button type="submit">Create Program</button>
      </form>
    </div>
  );
};

export default ProgramForm;
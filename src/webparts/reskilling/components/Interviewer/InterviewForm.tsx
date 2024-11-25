import * as React from 'react';
import { useForm } from 'react-hook-form';
import { getSP } from '../../../../index';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Config } from '../../config/config';

interface IInterviewFormProps {
  context: WebPartContext;
}

interface IInterviewFormInputs {
  ParticipantId: number;
  ScheduledDate: string;
  Outcome: string;
  Comments: string;
}

const InterviewForm: React.FC<IInterviewFormProps> = ({ context }) => {
  const { register, handleSubmit, reset } = useForm<IInterviewFormInputs>();

  const onSubmit = async (data: IInterviewFormInputs) => {
    try {
      const sp = getSP(context);
      const currentUser = await sp.web.currentUser();
      const userEmail = currentUser.Email;
      const INTERVIEWS_LIST = Config.LIST_NAMES.INTERVIEWS;

      await sp.web.lists.getByTitle(INTERVIEWS_LIST).items.add({
        ParticipantId: data.ParticipantId,
        InterviewerEmail: userEmail,
        ScheduledDate: data.ScheduledDate,
        Outcome: data.Outcome,
        Comments: data.Comments,
      });
      alert('Interview record added');
      reset();
    } catch (error) {
      console.error('Error adding interview:', error);
      alert('Error adding interview');
    }
  };

  return (
    <div>
      <h2>Add Interview Outcome</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Participant ID</label>
          <input type="number" {...register('ParticipantId', { required: true })} />
        </div>
        <div>
          <label>Scheduled Date</label>
          <input type="date" {...register('ScheduledDate', { required: true })} />
        </div>
        <div>
          <label>Outcome</label>
          <select {...register('Outcome', { required: true })}>
            <option value="">Select</option>
            <option value="Passed">Passed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label>Comments</label>
          <textarea {...register('Comments')} />
        </div>
        <button type="submit">Submit Outcome</button>
      </form>
    </div>
  );
};

export default InterviewForm;
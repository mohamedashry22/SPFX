import * as React from 'react';
import { getSP } from '../../../../index';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IInterview } from '../models/IInterview';
import { Config } from '../../config/config';
import InterviewForm from './InterviewForm';

interface IInterviewerDashboardProps {
  context: WebPartContext;
}

const InterviewerDashboard: React.FC<IInterviewerDashboardProps> = ({ context }) => {
  const [interviews, setInterviews] = React.useState<IInterview[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const sp = getSP(context);
        const currentUser = await sp.web.currentUser();
        const userEmail = currentUser.Email;
        const INTERVIEWS_LIST = Config.LIST_NAMES.INTERVIEWS;

        const items: IInterview[] = await sp.web.lists
          .getByTitle(INTERVIEWS_LIST)
          .items
          .filter(`InterviewerEmail eq '${userEmail}'`)
          .select('Id', 'ParticipantId', 'ScheduledDate')();

        setInterviews(items);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [context]);

  if (loading) {
    return <div>Loading interviews...</div>;
  }

  return (
    <div>
      <h1>Interviewer Dashboard</h1>
      <h2>Your Scheduled Interviews</h2>
      {interviews.length === 0 ? (
        <p>You have no scheduled interviews.</p>
      ) : (
        <ul>
          {interviews.map((interview) => (
            <li key={interview.Id}>
              Participant ID: {interview.ParticipantId}, Scheduled Date:{' '}
              {new Date(interview.ScheduledDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
      <InterviewForm context={context} />
    </div>
  );
};

export default InterviewerDashboard;
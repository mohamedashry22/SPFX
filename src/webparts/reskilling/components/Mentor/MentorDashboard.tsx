
import * as React from 'react';
import { getSP } from '../../../../index';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IParticipant } from '../models/IParticipant';
import { Config } from '../../config/config';

interface IMentorDashboardProps {
  context: WebPartContext;
}

const MentorDashboard: React.FC<IMentorDashboardProps> = ({ context }) => {
  const [participants, setParticipants] = React.useState<IParticipant[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const sp = getSP(context);
        const currentUser = await sp.web.currentUser();
        const userEmail = currentUser.Email;
        const PARTICIPANTS_LIST = Config.LIST_NAMES.PARTICIPANTS;

        const items: IParticipant[] = await sp.web.lists
          .getByTitle(PARTICIPANTS_LIST)
          .items
          .filter(`MentorEmail eq '${userEmail}'`)
          .select('Id', 'Title', 'Status')();

        setParticipants(items);
      } catch (error) {
        console.error('Error fetching participants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [context]);

  if (loading) {
    return <div>Loading participants...</div>;
  }

  return (
    <div>
      <h1>Mentor Dashboard</h1>
      <h2>Your Assigned Participants</h2>
      {participants.length === 0 ? (
        <p>You have no assigned participants.</p>
      ) : (
        <ul>
          {participants.map((participant) => (
            <li key={participant.Id}>
              {participant.Title} - {participant.Status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentorDashboard;
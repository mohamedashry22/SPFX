import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getSP } from '../../../../index';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IProgram } from '../models/IProgram';
import { Config } from '../../config/config';

interface IProgramDetailsProps {
  context: WebPartContext;
}

const ProgramDetails: React.FC<IProgramDetailsProps> = ({ context }) => {
  const { programId } = useParams<{ programId: string }>();
  const [program, setProgram] = React.useState<IProgram | null>(null);

  React.useEffect(() => {
    const fetchProgram = async () => {
      try {
        const sp = getSP(context);
        const PROGRAMS_LIST = Config.LIST_NAMES.PROGRAMS;

        const item: IProgram = await sp.web.lists
          .getByTitle(PROGRAMS_LIST)
          .items.getById(Number(programId))
          .select('Id', 'Title', 'StartDate', 'EndDate', 'IsActive')();

        setProgram(item);
      } catch (error) {
        console.error('Error fetching program:', error);
      }
    };

    fetchProgram();
  }, [context, programId]);

  if (!program) {
    return <div>Loading...</div>;
  }

  const handleToggleActive = async () => {
    try {
      const sp = getSP(context);
      const PROGRAMS_LIST = Config.LIST_NAMES.PROGRAMS;

      await sp.web.lists.getByTitle(PROGRAMS_LIST).items.getById(program.Id).update({
        IsActive: !program.IsActive,
      });

      setProgram({ ...program, IsActive: !program.IsActive });
    } catch (error) {
      console.error('Error updating program status:', error);
    }
  };

  return (
    <div>
      <h2>{program.Title}</h2>
      <p>Start Date: {new Date(program.StartDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(program.EndDate).toLocaleDateString()}</p>
      <p>Status: {program.IsActive ? 'Active' : 'Inactive'}</p>
      <button onClick={handleToggleActive}>
        {program.IsActive ? 'End Program' : 'Start Program'}
      </button>
    </div>
  );
};

export default ProgramDetails;
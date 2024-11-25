import * as React from 'react';
import { getSP } from '../../../../index';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IProgram } from '../models/IProgram';
import { Config } from '../../config/config';
import { useHistory } from 'react-router-dom';

interface IProgramListProps {
  context: WebPartContext;
}

const ProgramList: React.FC<IProgramListProps> = ({ context }) => {
  const [programs, setPrograms] = React.useState<IProgram[]>([]);
  const history = useHistory();

  React.useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const sp = getSP(context);
        const PROGRAMS_LIST = Config.LIST_NAMES.PROGRAMS;

        const items: IProgram[] = await sp.web.lists
          .getByTitle(PROGRAMS_LIST)
          .items.select('Id', 'Title', 'IsActive')();

        setPrograms(items);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, [context]);

  const handleProgramClick = (programId: number) => {
    history.push(`/dashboard/program/${programId}`);
  };

  return (
    <div>
      <h2>Programs</h2>
      <ul>
        {programs.map((program) => (
          <li key={program.Id}>
            <div
              onClick={() => handleProgramClick(program.Id)}
              style={{ cursor: 'pointer', color: 'blue' }}
            >
              {program.Title}
            </div>
            {' - '}
            {program.IsActive ? 'Active' : 'Inactive'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramList;

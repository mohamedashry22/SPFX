export interface IParticipant {
    Id: number;
    Title: string; // Developer Name
    Email: string;
    CurrentSkillset: string;
    TargetSkillset: string;
    ProgramId: number;
    Status: string;
    MentorEmail: string;
    InterviewScheduled: boolean;
    InterviewId?: number;
  }
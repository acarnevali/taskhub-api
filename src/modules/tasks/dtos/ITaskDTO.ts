export interface ICreateTaskDTO {
  title: string;
  description: string | null; 
  userId: string; 
}

export interface IUpdateTaskDTO {
  title?: string;
  description?: string | null;
  status?: string;
}
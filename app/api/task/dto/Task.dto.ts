export interface TaskCreateDTO {
  title: string;
  description: string | null;
}

export interface TaskDTO {
  id: number;
  title: string;
  description: string | null;
  isCompleted: boolean;
  date: string | Date;
}

export interface TaskUpdateDTO extends Partial<Omit<TaskDTO, 'id' | 'date'>> {}

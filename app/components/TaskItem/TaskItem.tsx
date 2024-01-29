import { Link, useFetcher } from '@remix-run/react';
import { TaskDTO } from '~/api/task/dto/Task.dto';
import Checkbox from '../Checkbox/Checkbox';
import { isoDateToString } from '~/utils/date';

interface TaskItemProps {
  task: TaskDTO;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const fetcher = useFetcher();

  const { id, description, title, isCompleted, date } = task;

  return (
    <div key={id} className="border p-4 rounded-lg shadow-md">
      <div className="flex flex-row justify-between gap-4">
        <Link
          to={`/tasks/${id}`}
          className={`text-lg ${
            isCompleted ? 'line-through text-gray-500' : 'text-blue-600'
          }`}
        >
          {title}
        </Link>

        <fetcher.Form method="post">
          <input type="hidden" name="taskId" value={id} />
          <Checkbox
            checked={isCompleted}
            onChange={(e) => {
              fetcher.submit(e.currentTarget.form!);
            }}
          />
        </fetcher.Form>
      </div>
      <p className="text-sm text-gray-700 my-1">{description}</p>
      <div className="flex justify-end">
        <p className="text-xs text-gray-600 mt-1">
          <span className="font-bold">Created:</span> {isoDateToString(date)}
        </p>
      </div>
    </div>
  );
};

import { ActionFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { TaskService } from '~/api/task';
import { TaskDTO } from '~/api/task/dto/Task.dto';
import { TaskItem } from '~/components/TaskItem/TaskItem';

export const loader = async (): Promise<Array<TaskDTO>> => {
  return await TaskService.getAllTasks();
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const taskId = formData.get('taskId');

  if (typeof taskId === 'string') {
    await TaskService.toggleTaskCompletion(parseInt(taskId));
  }

  return json({ ok: true });
};

export default function TaskList() {
  const tasks = useLoaderData<Array<TaskDTO>>();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Tasks</h1>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}

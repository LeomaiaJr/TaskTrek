import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, useLoaderData, useSearchParams } from '@remix-run/react';
import { TaskService } from '~/api/task';
import { TaskDTO } from '~/api/task/dto/Task.dto';
import { TaskItem } from '~/components/TaskItem/TaskItem';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<Array<TaskDTO>> => {
  const search = new URL(request.url).searchParams.get('search');
  return await TaskService.getAllTasks({
    search,
  });
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

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex flex-row relative items-center justify-center mb-4">
        <h1 className="text-2xl font-bold text-center mb-4">Tasks</h1>

        <Form className="absolute right-2">
          <input
            defaultValue={search}
            name="search"
            type="text"
            placeholder="Search tasks"
            className="border-2 border-gray-300 bg-white h-10 px-3 rounded-lg text-sm focus:outline-none"
          />
        </Form>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.length > 0 &&
          tasks.map((task) => <TaskItem task={task} key={task.id} />)}

        {tasks.length === 0 && (
          <div className="text-center text-gray-500">No tasks found</div>
        )}
      </div>
    </div>
  );
}

import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import {
  Form,
  isRouteErrorResponse,
  useActionData,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { useState } from 'react';
import { TaskService } from '~/api/task';
import { TaskDTO } from '~/api/task/dto/Task.dto';
import Checkbox from '~/components/Checkbox/Checkbox';
import { Field } from '~/components/Field/Field';
import { isoDateToString } from '~/utils/date';

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<TaskDTO | null> => {
  const id = params.id as string;

  if (!id || isNaN(+id)) {
    throw json({ message: 'Invalid task id' }, { status: 400 });
  }

  return await TaskService.getTaskById(+id);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const isCompleted = formData.get('isCompleted') === 'true';
  const taskId = formData.get('taskId') as string;
  const action = formData.get('action') as string;

  if (action === 'delete') {
    await TaskService.deleteTask(+taskId);
    return redirect('/tasks');
  }

  const errors = {} as Record<string, string>;

  if (typeof title !== 'string' || title.length === 0) {
    errors.title = 'Title is required';
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  await TaskService.updateTask(+taskId, {
    title: title,
    description: description,
    isCompleted,
  });

  return redirect('/tasks');
};

export default function UpdateTask() {
  const task = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [completed, setCompleted] = useState(task?.isCompleted ?? false);

  if (!task) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Task: {task?.title}
      </h1>
      <div className="border p-4 rounded-lg shadow-md">
        <Form method="post" className="flex flex-col gap-4">
          <input type="hidden" name="taskId" value={task.id} />

          <Field
            label="Title"
            name="title"
            required
            error={actionData?.errors?.title}
          >
            <input
              className="border-2 border-gray-300 bg-white h-10 px-3 rounded-lg text-sm focus:outline-none"
              type="text"
              name="title"
              id="title"
              defaultValue={task?.title}
            />
          </Field>

          <Field label="Description" name="description">
            <textarea
              name="description"
              id="description"
              className="border-2 border-gray-300 h-40 bg-white py-2 px-3 rounded-lg text-sm focus:outline-none"
              defaultValue={task?.description ?? ''}
            ></textarea>
          </Field>

          <div className="flex flex-row gap-2">
            Completed:
            <Checkbox
              value={completed ? 'true' : 'false'}
              name="isCompleted"
              checked={completed}
              onChange={(e) => {
                setCompleted(e.currentTarget.checked);
              }}
            />
          </div>

          <div>Created: {isoDateToString(task.date)}</div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="submit"
              name="action"
              value="delete"
              className="bg-red text-white font-bold py-2 px-4 rounded"
            >
              Delete Task
            </button>

            <button
              type="submit"
              name="action"
              value="update"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Task
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 400:
        return (
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-2">Error</h1>
            <p className="text-center">{error.data.message}</p>
          </div>
        );
    }

    return (
      <div>
        Something went wrong: {error.status} {error.statusText}
      </div>
    );
  }
}

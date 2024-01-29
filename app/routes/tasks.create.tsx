import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { TaskService } from '~/api/task';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get('title');
  const description = formData.get('description');

  const errors = {} as Record<string, string>;

  if (typeof title !== 'string' || title.length === 0) {
    errors.title = 'Title is required';
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  await TaskService.createTask({
    title: title as string,
    description: description as string,
  });

  return redirect('/tasks');
};

export default function CreateTask() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Create Task</h1>
      <div className="border p-4 rounded-lg shadow-md">
        <Form method="post" className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="title">
              Title<span className="font-bold text-red">*</span>:
            </label>
            <input
              className="border-2 border-gray-300 bg-white h-10 px-3 rounded-lg text-sm focus:outline-none"
              type="text"
              name="title"
              id="title"
            />

            {actionData?.errors?.title && (
              <p className="text-red text-sm">{actionData.errors.title}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description: </label>
            <textarea
              name="description"
              id="description"
              className="border-2 border-gray-300 h-40 bg-white py-2 px-3 rounded-lg text-sm focus:outline-none"
            ></textarea>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Task
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

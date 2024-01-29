import { redirect } from '@remix-run/node';

export const loader = () => {
  return redirect('/tasks');
};

export default function Index() {
  return null;
}

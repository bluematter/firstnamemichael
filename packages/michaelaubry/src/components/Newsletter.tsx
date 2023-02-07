import clsx from 'clsx';
import { gql, request } from 'graphql-request';
import { SyntheticEvent, useState } from 'react';

import { Button } from '@/components/Button';

const CREATE_USER = gql`
  mutation ($email: String!) {
    createUser(email: $email) {
      id
      email
    }
  }
`;

interface INewsletterProps {
  minimal?: boolean;
}

export default function Newsletter({ minimal }: INewsletterProps) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formData = new FormData(e.target as any);
    const { email } = Object.fromEntries(formData.entries());

    try {
      const data = await request(
        'https://michaelaubry-prisma.vercel.app/api',
        CREATE_USER,
        {
          email,
        }
      );

      if (data?.createUser?.id) {
        setSuccess(data);
      } else {
        setError(data);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e);
    }
  };

  return (
    <>
      <form
        className={clsx(
          !minimal &&
            'rounded-2xl  border border-zinc-100 p-6 dark:border-zinc-700/40',
          'sticky top-0'
        )}
        onSubmit={handleSubmit}
      >
        {!minimal && (
          <h2 className='flex text-sm font-semibold text-zinc-900 dark:text-zinc-100'>
            <MailIcon className='h-6 w-6 flex-none' />
            <span className='ml-3'>Stay up to date</span>
          </h2>
        )}
        <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
          Get notified when I publish something new -- unsubscribe at any time.
        </p>
        <div className='mt-4 flex'>
          <input
            type='email'
            placeholder='Email address'
            aria-label='Email address'
            required
            name='email'
            className='min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm'
          />
          <Button type='submit' className='ml-4 flex-none'>
            Join
          </Button>
        </div>
        {error ? (
          <p className='mt-2 text-red-600'>There was an error</p>
        ) : (
          <>
            {success ? (
              <p className='mt-2 text-teal-500'>
                Thanks for joining, check your inbox!
              </p>
            ) : (
              <p className='mt-3 text-sm italic text-gray-500 dark:text-gray-100'>
                Join the family!
              </p>
            )}
          </>
        )}
      </form>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MailIcon(props: any) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      {...props}
    >
      <path
        d='M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z'
        className='fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500'
      />
      <path
        d='m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6'
        className='stroke-zinc-400 dark:stroke-zinc-500'
      />
    </svg>
  );
}

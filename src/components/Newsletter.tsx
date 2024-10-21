/* eslint-disable no-console */
import clsx from 'clsx';
import Image from 'next/image';
import { SyntheticEvent, useState } from 'react';

import { Button } from '@/components/Button';

interface INewsletterProps {
  minimal?: boolean;
}

export default function Newsletter({ minimal }: INewsletterProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;

    try {
      setLoading(true);

      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://www.michaelaubry.com';

      const response = await fetch(`${baseUrl}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }

      setSuccess(data);
    } catch (error) {
      console.error('Subscription error:', error);
      if (error instanceof Error) {
        if (error.message.includes('Email already exists')) {
          setError('This email is already subscribed.');
        } else {
          setError(error.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='mb-4 flex'>
        <div className='isolate flex -space-x-1 overflow-hidden'>
          <Image
            width={24}
            height={24}
            className='relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-zinc-900'
            src='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt=''
          />
          <Image
            width={24}
            height={24}
            className='relative z-20 inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-zinc-900'
            src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt=''
          />
          <Image
            width={24}
            height={24}
            className='relative z-10 inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-zinc-900'
            src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
            alt=''
          />
          <Image
            width={24}
            height={24}
            className='relative z-0 inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-zinc-900'
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt=''
          />
        </div>
        <div className='ml-4 font-medium italic text-teal-500'>
          Join 1000+ other subscribers
        </div>
      </div>
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
            className='min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10'
          />
          <Button type='submit' className='ml-4 flex-none'>
            {loading ? (
              <>
                <svg
                  className='h-5 w-5 animate-spin text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    stroke-width='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Joining...
              </>
            ) : (
              <>Join</>
            )}
          </Button>
        </div>
        {error ? (
          <p
            className={clsx(
              error.includes('already exists')
                ? 'text-teal-500'
                : 'text-red-600',
              'mt-2'
            )}
          >
            {error}
          </p>
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

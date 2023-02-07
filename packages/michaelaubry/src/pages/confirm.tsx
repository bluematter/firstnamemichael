import { gql, request } from 'graphql-request';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SimpleLayout } from '@/components/SimpleLayout';

const CONFIRM_USER = gql`
  mutation ($email: String!) {
    confirmUser(email: $email) {
      id
      email
    }
  }
`;

export default function Confirm() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const email = router.query.email;

      const data = await request(
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3001/api'
          : 'https://michaelaubry-prisma.vercel.app/api',
        CONFIRM_USER,
        {
          email,
        }
      );

      console.log('User confirmed', {
        data,
      });
    })();
  }, [router]);

  return (
    <>
      <Head>
        <title>Confirmed - Michael Aubry</title>
        <meta
          name='description'
          content='Thanks for confirming your subscription.'
        />
      </Head>
      <SimpleLayout
        title='Thanks for confirming your subscription.'
        intro='You are all set and will be hearing from me soon. I am looking forward to adding some value to you. Go check out some articles if you would like.'
      />
    </>
  );
}

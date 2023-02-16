import clsx from 'clsx';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/Container';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons';

import portraitImage from '@/images/IMG_7290.jpg';

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className='group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Icon className='h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500' />
        <span className='ml-4'>{children}</span>
      </Link>
    </li>
  );
}

function MailIcon(props) {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' {...props}>
      <path
        fillRule='evenodd'
        d='M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z'
      />
    </svg>
  );
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Michael Aubry</title>
        <meta
          name='description'
          content='I’m Michael Aubry. I live in San Diego, where I design the future.'
        />
      </Head>
      <Container className='mt-16 sm:mt-32'>
        <div className='grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12'>
          <div className='lg:pl-20'>
            <div className='max-w-xs px-2.5 lg:max-w-none'>
              <Image
                src={portraitImage}
                alt=''
                sizes='(min-width: 1024px) 32rem, 20rem'
                className='aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800'
                style={{
                  objectPosition: '0px -140px',
                }}
              />
            </div>
          </div>
          <div className='lg:order-first lg:row-span-2'>
            <h1 className='text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'>
              I’m Michael Aubry. I live in San Diego, where I design the future.
            </h1>
            <div className='mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400'>
              <p>
                I started off playing sports and fell in love with coding at the
                age of 17. I grew up in the 90s, and was a part of the early
                stages of the internet. I remember when the first web browser
                was released, and I was hooked. The new wave of the internet and
                gaming had me hooked. Some examples of technologies I used in my
                early years were AIM and the Sims -- I cannot forget those two.
              </p>
              <p>
                I grew up in a small town called Jacksonville, Illinois. There
                we're only 18,000 people in that town, not a whole lot of
                dreamers. I always knew I was a big dreamer, and at the age of
                23 I packed everything up and headed to Silicon Valley with
                $300, some computer skills, and a big dream.
              </p>
              <p>
                I spent the next few years working at tech companies in Mountain
                View, CA and in San Francisco. I lived in my car for the first
                year to build up my base. Most of this was possible due to the
                attitude of the city and the kindess of the folks at the Hacker
                Dojo (at the time on Fairchild, right by Google)
              </p>
              <p>
                Today, I’m the founder of{' '}
                <a
                  className='font-medium italic text-teal-500'
                  href='https://motionbox.io'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Motionbox
                </a>
                , where we’re working on video sales tools to enable sales teams
                to close more deals in a unique way.
              </p>
            </div>
          </div>
          <div className='lg:pl-20'>
            <ul role='list'>
              <SocialLink
                href='https://twitter.com/michaelaubry'
                icon={TwitterIcon}
              >
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href='https://www.instagram.com/michaelaubry/'
                icon={InstagramIcon}
                className='mt-4'
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href='https://github.com/bluematter'
                icon={GitHubIcon}
                className='mt-4'
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href='https://www.linkedin.com/in/michael-aubry-497796104/'
                icon={LinkedInIcon}
                className='mt-4'
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href='mailto:michael@motionbox.io'
                icon={MailIcon}
                className='mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40'
              >
                michael@motionbox.io
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}

import Head from 'next/head';
import Link from 'next/link';

import { formatDate } from '@/lib/formatDate';
import { generateRssFeed } from '@/lib/generateRssFeed';
import { getAllArticles } from '@/lib/getAllArticles';

import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import Newsletter from '@/components/Newsletter';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons';

function Article({ article }) {
  return (
    <Card as='article'>
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as='time' dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link
      className='group -m-1 p-1'
      {...props}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Icon className='h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300' />
    </Link>
  );
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>
          Michael Aubry - I’m a software designer and entrepreneur based in San
          Diego
        </title>
        <meta
          name='description'
          content={`Hi, I'm Michael Aubry 👋. A tech entrepreneur based in San Diego. I'm the founder of Based Labs, where we develop AI tools. Follow me on social and join my newsletter for quality content.`}
        />
      </Head>
      <Container className='mt-9'>
        <div className='flex flex-col space-y-4 lg:flex-row lg:space-x-8'>
          <div className='lg:w-[50%]'>
            <h1 className='text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100'>
              Hi, I'm Michael Aubry 👋
            </h1>
            <p className='mt-6 text-base text-zinc-600 dark:text-zinc-400'>
              A tech entrepreneur based in San Diego. I'm the founder of{' '}
              <a
                className='font-medium italic text-teal-500'
                href='https://www.basedlabs.ai'
                target='_blank'
                rel='noopener noreferrer'
              >
                BasedLabs
              </a>
              , where we develop AI tools. Follow me on social and join my
              newsletter for quality content 👇
            </p>

            <div className='mt-6 flex gap-2'>
              <SocialLink
                href='https://twitter.com/michaelaubry'
                aria-label='Follow on Twitter'
                icon={TwitterIcon}
              />
              <SocialLink
                href='https://www.instagram.com/michaelaubry/'
                aria-label='Follow on Instagram'
                icon={InstagramIcon}
              />
              <SocialLink
                href='https://github.com/bluematter'
                aria-label='Follow on GitHub'
                icon={GitHubIcon}
              />
              <SocialLink
                href='https://www.linkedin.com/in/michael-aubry-497796104/'
                aria-label='Follow on LinkedIn'
                icon={LinkedInIcon}
              />
            </div>
            <div className='mt-6'>
              <Newsletter minimal={true} />
            </div>
          </div>
          <div className='flex items-center lg:mt-0 lg:flex-1'>
            <div className='h-full w-full'>
              <video
                src='https://cdn.basedlabs.ai/michaelaubry_hero.mp4?t=0'
                autoPlay
                loop
                muted
                playsInline
                controls
                className='h-full w-full rounded-lg object-cover'
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </Container>
      {/* <Photos /> */}
      <Container className='mt-24 md:mt-28'>
        <div className='mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2'>
          <div className='flex flex-col gap-16'>
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className='space-y-10 lg:pl-16 xl:pl-24'>
            <Newsletter />
            {/* <Resume /> */}
          </div>
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed();
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        // eslint-disable-next-line unused-imports/no-unused-vars
        .map(({ component, ...meta }) => meta),
    },
  };
}

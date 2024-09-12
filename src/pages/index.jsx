import Head from 'next/head';
import Image from 'next/image';
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
          content='I’m Michael, a software designer and entrepreneur based in San
          Diego. I’m the founder of Motionbox, where we develop video sales
          solutions that empower teams to sell more stuff, faster. Follow me
          on social and join my newsletter 👇'
        />
      </Head>
      <Container className='mt-9'>
        <div className='flex flex-col space-x-8 lg:flex-row'>
          <div className='sm:w-[60%]'>
            <h1 className='text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'>
              Hi, I'm Michael Aubry 👋
            </h1>
            <p className='mt-6 text-base text-zinc-600 dark:text-zinc-400'>
              I'm Michael, a software designer and entrepreneur based in San
              Diego. I'm the founder of{' '}
              <a
                className='font-medium italic text-teal-500'
                href='https://www.basedlabs.ai'
                target='_blank'
                rel='noopener noreferrer'
              >
                BasedLabs
              </a>
              , where we develop the most based AI tools. Follow me on social and join my newsletter 👇
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
            <div className='w-full'>
              <Image
                alt='Michael Aubry'
                src="https://cdn.basedlabs.ai/f8f84d40-6b51-11ef-8dfc-efc6c10724c7.mp4"
                layout='responsive'
                width={16}
                height={16}
                objectFit='cover'
                className='rounded-lg'
              />
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

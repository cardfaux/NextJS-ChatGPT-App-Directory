import Header from '@/components/chat/Header';
import Message from '@/components/chat/Message';
import Prompt from '@/components/chat/Prompt';
import SessionSelect from '@/components/chat/SessionSelect';

const SESSION_KEYS = [
  'u1-2023-04-29T23:05:00.252Z',
  'u2-2023-04-29T23:05:00.123Z',
  'u3-2023-04-29T23:05:00.349Z',
  'u4-2023-04-29T23:05:00.907Z',
];

async function getStacks() {
  const res = await fetch(`${process.env.BASE_URL}/api/get-stacks`);
  const stacks = await res.json();
  return stacks;
}

export default async function Stack({ params }: { params: { stack: string } }) {
  const stacks = await getStacks();
  let stack = stacks[params.stack];

  return (
    <div className='h-full flex flex-col'>
      <Header stack={stack} params={params} />

      <SessionSelect />

      <hr className='my-4' />

      <Message params={params} />
      <div className='flex'>
        <Prompt stackKey={params.stack} />
      </div>
    </div>
  );
}

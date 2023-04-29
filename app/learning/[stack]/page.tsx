import Header from '@/components/chat/Header';
import Message from '@/components/chat/Message';
import Prompt from '@/components/chat/Prompt';

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

      <hr className='my-4' />

      <Message />
      <div className='flex'>
        <Prompt />
      </div>
    </div>
  );
}

import Image from 'next/image';

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
      <div className='header flex bg-slate-200 p-4 rounded-2xl'>
        <div className='flex mr-4 justify-center items-center'>
          <Image src={stack.logo} width={200} height={200} alt={`${params.stack} stack`} />
        </div>
        <div className='flex font-bold text-sm'>{stack.info}</div>
      </div>

      <hr className='my-4' />

      <div className='chat flex flex-col h-full overflow-scroll'>
        <div className='flex flex-row bg-slate-100 p-4'>
          <div className='w-[30px] relative mr-4'>
            <Image src='/logo-open-ai.png' width={30} height={30} alt='open ai logo' />
          </div>
          <div className='w-full'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularized in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
      <div className='flex p-4'>
        <textarea
          rows={4}
          className='w-full p-2.5 text-sm text-gray-900 bg-slate-200 rounded-lg border border-gray-300'
          placeholder='Write your prompt there...'
        />
      </div>
    </div>
  );
}

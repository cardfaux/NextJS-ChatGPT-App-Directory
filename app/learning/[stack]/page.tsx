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
          <Image src={stack.logo} width={200} height={200} alt={`stack`} />
        </div>
        <div className='flex font-bold text-sm'>{stack.info}</div>
      </div>
    </div>
  );
}

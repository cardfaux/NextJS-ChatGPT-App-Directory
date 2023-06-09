import stacksJson from '@/data/stacks.json';
import { StackTypes } from '@/types/StackTypes';
import { StackImage } from '@/components/homepage/StackImage';

export default function Home() {
  const stacks = stacksJson as StackTypes;

  const renderStacks = () => {
    return Object.keys(stacks).map((stackKey, index) => {
      const stack = stacks[stackKey];
      return <StackImage stack={stack} key={stackKey} />;
    });
  };
  return (
    <div className='h-full flex justify-center items-center flex-col'>
      <div>What do you have questions about</div>
      <div className='flex'>{renderStacks()}</div>
    </div>
  );
}

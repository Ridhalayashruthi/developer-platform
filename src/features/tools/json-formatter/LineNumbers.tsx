interface LineNumbersProps {
  text: string;
}

export default function LineNumbers({ text }: LineNumbersProps) {
  const count = text ? text.split('\n').length : 0;

  return (
    <div className='min-w-8 pr-3 text-right text-slate-500'>
      {text &&
        Array.from({ length: count }, (_, i) => <div key={i}>{i + 1}</div>)}
    </div>
  );
}

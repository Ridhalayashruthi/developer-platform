interface Base64StatsProps {
  text: string;
  mode: 'encode' | 'decode';
}

export default function Base64Stats({ text, mode }: Base64StatsProps) {
  const characters = text.length;
  const lines = text ? text.split('\n').length : 0;

  return (
    <div className='flex flex-wrap items-center gap-3 text-sm text-slate-400'>
      <span>
        Characters{' '}
        <span className='font-semibold text-white'>{characters}</span>
      </span>

      <span>•</span>

      <span>
        Lines <span className='font-semibold text-white'>{lines}</span>
      </span>

      {text && (
        <>
          <span>•</span>

          <span>
            Mode{' '}
            <span className='font-semibold text-white capitalize'>{mode}</span>
          </span>
        </>
      )}
    </div>
  );
}

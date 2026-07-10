interface JsonStatsProps {
  json: string;
}

export default function JsonStats({ json }: JsonStatsProps) {
  const characters = json.length;
  const lines = json ? json.split('\n').length : 0;

  let objects = 0;
  let arrays = 0;
  let keys = 0;

  try {
    const parsed = JSON.parse(json);

    const walk = (value: unknown) => {
      if (Array.isArray(value)) {
        arrays++;

        value.forEach(walk);
      } else if (value && typeof value === 'object') {
        objects++;

        const obj = value as Record<string, unknown>;

        keys += Object.keys(obj).length;

        Object.values(obj).forEach(walk);
      }
    };

    walk(parsed);
  } catch {
    // Ignore invalid JSON
  }

  return (
    <div className='flex flex-wrap items-center text-sm text-slate-400'>
      <Stat title='Characters' value={characters} />
      <span className='mx-3 text-slate-600'>•</span>

      <Stat title='Lines' value={lines} />
      <span className='mx-3 text-slate-600'>•</span>

      <Stat title='Objects' value={objects} />
      <span className='mx-3 text-slate-600'>•</span>

      <Stat title='Arrays' value={arrays} />
      <span className='mx-3 text-slate-600'>•</span>

      <Stat title='Keys' value={keys} />
    </div>
  );
}
function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className='flex items-center gap-1'>
      <span>{title}</span>
      <span className='font-semibold text-white'>{value}</span>
    </div>
  );
}

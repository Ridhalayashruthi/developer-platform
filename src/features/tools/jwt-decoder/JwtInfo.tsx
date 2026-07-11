import type { JwtInfo as JwtInfoType } from './types';

interface JwtInfoProps {
  info: JwtInfoType;
}

export default function JwtInfo({ info }: JwtInfoProps) {
  if (!info.algorithm) return null;

  return (
    <div className="mb-5 rounded-lg border border-slate-700 bg-slate-800/40 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-300">
        JWT Information
      </h3>

      <div className="space-y-2 text-sm">
        <Row label="Algorithm" value={info.algorithm} />
        <Row label="Type" value={info.type} />
        <Row label="Issued At" value={info.issuedAt ?? '-'} />
        <Row label="Expires" value={info.expiresAt ?? '-'} />

        <div className="flex justify-between">
          <span className="text-slate-400">Status</span>

          <span
            className={
              info.status === 'Valid'
                ? 'text-green-400'
                : info.status === 'Expired'
                ? 'text-red-400'
                : 'text-yellow-400'
            }
          >
            {info.status}
          </span>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>

      <span>{value}</span>
    </div>
  );
}
import type { DatasetMetadata } from '../types/property'

interface DataNoticeProps {
  metadata: DatasetMetadata
}

export function DataNotice({ metadata }: DataNoticeProps) {
  return (
    <aside className="data-notice" aria-labelledby="data-notice-title">
      <strong id="data-notice-title">{metadata.label}</strong>
      <p>{metadata.notice}</p>
    </aside>
  )
}

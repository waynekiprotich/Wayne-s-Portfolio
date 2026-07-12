import { useRef, useState } from 'react'

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function FileDropzone({ files, onFilesChange, accept, label }) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList)
    onFilesChange([...files, ...incoming])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const removeFile = (index) => {
    onFilesChange(files.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition ${
          isDragging
            ? 'border-ink bg-ink/5 dark:border-white dark:bg-white/10'
            : 'border-fog dark:border-white/15 hover:border-ink dark:hover:border-white'
        }`}
      >
        <p className="text-sm text-ink dark:text-white font-medium">{label}</p>
        <p className="text-xs text-stone mt-1">Drag and drop files here, or click to browse</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          onChange={(e) => addFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 rounded-xl bg-mist dark:bg-white/5 text-sm"
            >
              <span className="truncate text-ink dark:text-white">{file.name}</span>
              <span className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-stone">{formatSize(file.size)}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-stone hover:text-ink dark:hover:text-white transition"
                  aria-label={`Remove ${file.name}`}
                >
                  Remove
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
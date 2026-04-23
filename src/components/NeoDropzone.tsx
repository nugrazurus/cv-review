interface NeoDropzoneProps {
  id?: string;
  className?: string;
}

export function NeoDropzone({ id = 'file-dropzone', className = '' }: NeoDropzoneProps) {
  return (
    <div
      id={id}
      className={`border-4 border-black border-dashed bg-white p-lg hover:bg-primary/20 transition-colors cursor-pointer ${className}`}
    >
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <span className="material-symbols-outlined text-6xl text-on-surface">upload</span>
        <p className="font-display font-bold text-2xl mt-sm">Drop your CV here</p>
        <p className="font-body text-base text-gray-600 mt-xs">or click to browse</p>
        <p className="font-body text-sm text-gray-400 mt-xs">Accepted: PDF, DOCX, TXT (max 5MB)</p>
      </div>
    </div>
  );
}
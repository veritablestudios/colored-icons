export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
    </div>
  );
}

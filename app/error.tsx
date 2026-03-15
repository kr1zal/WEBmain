'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h2 className="font-display mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Что-то пошло не так
      </h2>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        Произошла ошибка при загрузке страницы.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
      >
        Попробовать снова
      </button>
    </div>
  )
}

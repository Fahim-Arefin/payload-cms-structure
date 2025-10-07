import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[70vh] grid place-items-center px-6 py-24">
      <div className="text-center">
        <p className="text-sm font-semibold text-orange-600">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-gray-600">
          The page you’re looking for doesn’t exist or has been unpublished.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}

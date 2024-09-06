"use client"

export default function Header() {
  return (
    <header className="bg-white text-black py-3 sm:py-4 w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <a href="/" className="block">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">LarryDavidBot.</h1>
        </a>
      </div>
    </header>
  )
}
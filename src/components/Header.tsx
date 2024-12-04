import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            FlowThread
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="#features" className="text-gray-600 hover:text-gray-800">
                Features
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-800">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-gray-600 hover:text-gray-800">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}


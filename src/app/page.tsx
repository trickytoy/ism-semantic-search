import Link from 'next/link'
import { Zap, Cpu, Crown } from 'lucide-react'
import SearchForm from '@/components/search-form'
import { promises as fs } from 'fs';

export default async function Home() {
  // Read the file and parse it as JSON
  const file = JSON.parse(await fs.readFile(process.cwd() + '/src/app/ISM.json', 'utf8'));

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Crown className="h-6 w-6" />
          <span className="sr-only">Semantic Search</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="https://www.cyber.gov.au/resources-business-and-government/essential-cyber-security/ism#">
            ISM
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full min-h-screen flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  ISM Semantic Search
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover the power of intelligent search. Find the exact control that you're looking for with our advanced semantic search engine.
                </p>
              </div>
              <div className="w-4/5 space-y-2">
                {/* Pass the file data as a prop to SearchForm */}
                <SearchForm fileData={file} />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-6 md:px-6">
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Zap className="h-10 w-10" />
                <h2 className="text-xl font-bold">Intelligent Search</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Leverage cutting-edge algorithms designed to enhance your search experience. Our semantic search engine intelligently maps and retrieves ISM controls and guidelines with high precision, ensuring that you get the most relevant and accurate results. Whether you are looking for specific security measures or comprehensive control sets, our search functionality is tailored to meet your needs.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 text-center">
                <Cpu className="h-10 w-10" />
                <h2 className="text-xl font-bold">Optimized for ISM</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Our AI-powered technology is specifically optimized for the Information Security Manual (ISM). By utilizing advanced machine learning models, we ensure that your search queries yield the most relevant ISM controls and guidelines. The system efficiently covers all aspects of security frameworks, offering you a comprehensive tool for navigating complex security standards and requirements with ease.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Semantic Search Inc. All rights reserved.     Using ISM september 2024</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Define the type for search results
interface SearchResult {
  ID: string
  Guideline: string
  Section: string
  Topic: string
  Description: string
}

interface FileDataProps {
  fileData: { [date: string]: SearchResult[] }
}

export default function SearchForm({ fileData }: FileDataProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showAll, setShowAll] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)

  // Extract the version keys (e.g., "Sept_2024", "Nov_2024")
  const versionOptions = Object.keys(fileData)


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    if (!selectedVersion) {
      console.error('No version selected')
      setIsSearching(false)
      return
    }

    // Filter data by selected version
    const dataForVersion = fileData[selectedVersion]

    // Combine data fields into strings for searching
    const result = dataForVersion.map(item => Object.values(item).join('|'))

    try {
      const response = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchQuery,
          result,
        }),
      })

      const output = await response.json()

      const ismRanked = result.map((sentence, index) => ({
        sentence,
        score: output[index],
      })).sort((a, b) => b.score - a.score)

      const rankedResults = ismRanked.map(rank => {
        const fields = rank.sentence.split('|')
        return {
          ID: fields[0],
          Guideline: fields[1],
          Section: fields[2],
          Topic: fields[3],
          Description: fields[4],
        }
      })

      setSearchResults(rankedResults)
    } catch (error) {
      console.error('Error during search:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleShowMore = () => setShowAll(!showAll)

  const displayedResults = showAll ? searchResults : searchResults.slice(0, 10)

  return (
    <div className="pb-8">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <select
          className="p-2 border rounded"
          value={selectedVersion ?? ''}
          onChange={(e) => setSelectedVersion(e.target.value)}
        >
          <option value="" disabled>Select ISM Version</option>
          {versionOptions.map(version => (
            <option key={version} value={version}>{version}</option>
          ))}
        </select>

        <Input
          className="w-full flex-1"
          placeholder="Enter your search query..."
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button type="submit" disabled={isSearching || !selectedVersion}>
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {searchResults.length > 0 && (
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedResults.map((result, index) => (
              <li 
                key={index} 
                className="bg-white p-4 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100"
              >
                <h3 className="text-lg font-bold">[{result.ID}] {result.Guideline}</h3>
                <p><strong>Section:</strong> {result.Section}</p>
                <p><strong>Topic:</strong> {result.Topic}</p>
                <p><strong>Description:</strong> {result.Description}</p>
              </li>
            ))}
          </ul>
          {searchResults.length > 10 && (
            <Button onClick={handleShowMore} className="mt-4">
              {showAll ? 'Show Less' : 'View All'}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

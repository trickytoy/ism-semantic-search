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
  fileData: SearchResult[] // Define the expected structure of the file data
}

export default function SearchForm({ fileData }: FileDataProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])  // Use SearchResult type
  const [showAll, setShowAll] = useState(false) // Track whether to show all results or only the first 10
 
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Extract the values from the fileData and combine them into a single string per entry
    const result = fileData.map(item => Object.values(item).join('|'))

    try {
      // Call the Next.js API route with the search query and file data
      const response = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchQuery,
          result,
        }),
      });

      const output = await response.json();
      // Rank the ISM results based on the API output

      const ismRanked = result.map((sentence, index) => ({
        sentence,
        score: output[index],
      })).sort((a, b) => b.score - a.score);

      // Map ranked results back to the original fileData structure
      const rankedResults = ismRanked.map(rank => {
        const fields = rank.sentence.split('|');
        return {
          ID: fields[0],
          Guideline: fields[1],
          Section: fields[2],
          Topic: fields[3],
          Description: fields[4],
        };
      });

      setSearchResults(rankedResults);
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setIsSearching(false);
    }
  }

  const handleShowMore = () => {
    setShowAll(!showAll); // Toggle between showing all results and the first 10
  }

  // Determine which results to display
  const displayedResults = showAll ? searchResults : searchResults.slice(0, 10);

  return (
    <div className="pb-8"> {/* Added bottom padding here */}
      <form onSubmit={handleSearch} className="flex space-x-2">
        <Input
          className="w-full flex-1"
          placeholder="Enter your search query..."
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" disabled={isSearching}>
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
          {/* Use grid layout to create 3 columns */}
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

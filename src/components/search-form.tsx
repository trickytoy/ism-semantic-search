'use client'

import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Define the type for search results
interface SearchResult {
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
      const ismID = ["ISM-0714", "ISM-1478", "ISM-1617", "ISM-0724", "ISM-0725", "ISM-0726", "ISM-0718", "ISM-1918", "ISM-0733", "ISM-1618", "ISM-0734", "ISM-0720", "ISM-0731", "ISM-0732", "ISM-0717", "ISM-0735", "ISM-1071", "ISM-1525", "ISM-1633", "ISM-1634", "ISM-1635", "ISM-1636", "ISM-0027", "ISM-1526", "ISM-1587", "ISM-0576", "ISM-1784", "ISM-0125", "ISM-1803", "ISM-1625", "ISM-1626", "ISM-0120", "ISM-0123", "ISM-0140", "ISM-1880", "ISM-1881", "ISM-1819", "ISM-0133", "ISM-0917", "ISM-0137", "ISM-1609", "ISM-1731", "ISM-1732", "ISM-1213", "ISM-0138", "ISM-1631", "ISM-1452", "ISM-1567", "ISM-1568", "ISM-1882", "ISM-1632", "ISM-1569", "ISM-1785", "ISM-1786", "ISM-1787", "ISM-1788", "ISM-1789", "ISM-1790", "ISM-1791", "ISM-1792", "ISM-1736", "ISM-1737", "ISM-1793", "ISM-1637", "ISM-1638", "ISM-1529", "ISM-1570", "ISM-1395", "ISM-0072", "ISM-1571", "ISM-1738", "ISM-1804", "ISM-0141", "ISM-1794", "ISM-1451", "ISM-1572", "ISM-1573", "ISM-1574", "ISM-1575", "ISM-1073", "ISM-1576", "ISM-0039", "ISM-0047", "ISM-1739", "ISM-0888", "ISM-1602", "ISM-0041", "ISM-0043", "ISM-1163", "ISM-1563", "ISM-1564", "ISM-0810", "ISM-1053", "ISM-1530", "ISM-0813", "ISM-1074", "ISM-1296", "ISM-1543", "ISM-0225", "ISM-0829", "ISM-0164", "ISM-0161", "ISM-0252", "ISM-1565", "ISM-1740", "ISM-0817", "ISM-0820", "ISM-1146", "ISM-0821", "ISM-0824", "ISM-1864", "ISM-0432", "ISM-0434", "ISM-0435", "ISM-1865", "ISM-0414", "ISM-0415", "ISM-1583", "ISM-0420", "ISM-0405", "ISM-1852", "ISM-1566", "ISM-0409", "ISM-0411", "ISM-1507", "ISM-1508", "ISM-1175", "ISM-1883", "ISM-1649", "ISM-0445", "ISM-1263", "ISM-1509", "ISM-1650", "ISM-0446", "ISM-0447", "ISM-0430", "ISM-1591", "ISM-1404", "ISM-1648", "ISM-1716", "ISM-1647", "ISM-0407", "ISM-0441", "ISM-0443", "ISM-1610", "ISM-1611", "ISM-1612", "ISM-1614", "ISM-1615", "ISM-1613", "ISM-0078", "ISM-0854", "ISM-0181", "ISM-1111", "ISM-0211", "ISM-0208", "ISM-1645", "ISM-1646", "ISM-0206", "ISM-1096", "ISM-1639", "ISM-1640", "ISM-1820", "ISM-0926", "ISM-1718", "ISM-1719", "ISM-1216", "ISM-1112", "ISM-1119", "ISM-0187", "ISM-1821", "ISM-1114", "ISM-1130", "ISM-1164", "ISM-0195", "ISM-0194", "ISM-0201", "ISM-1115", "ISM-1133", "ISM-1122", "ISM-1105", "ISM-1095", "ISM-1822", "ISM-1107", "ISM-1720", "ISM-1721", "ISM-1109", "ISM-0218", "ISM-1102", "ISM-1101", "ISM-1103", "ISM-1098", "ISM-1100", "ISM-0213", "ISM-0216", "ISM-0217", "ISM-1116", "ISM-0198", "ISM-1123", "ISM-0250", "ISM-1884", "ISM-1137", "ISM-0248", "ISM-0249", "ISM-0246", "ISM-1885", "ISM-1078", "ISM-0229", "ISM-0230", "ISM-0231", "ISM-0232", "ISM-0233", "ISM-0235", "ISM-0236", "ISM-0931", "ISM-1562", "ISM-0546", "ISM-0548", "ISM-0547", "ISM-0554", "ISM-0553", "ISM-0555", "ISM-0551", "ISM-1014", "ISM-0549", "ISM-0556", "ISM-0558", "ISM-0559", "ISM-1450", "ISM-1019", "ISM-1805", "ISM-0588", "ISM-1092", "ISM-0241", "ISM-1075", "ISM-0245", "ISM-1854", "ISM-0590", "ISM-0589", "ISM-1855", "ISM-1036", "ISM-1297", "ISM-1400", "ISM-1866", "ISM-0694", "ISM-1482", "ISM-0874", "ISM-0705", "ISM-1533", "ISM-1195", "ISM-1867", "ISM-0687", "ISM-0869", "ISM-1868", "ISM-1085", "ISM-1886", "ISM-1887", "ISM-1888", "ISM-0863", "ISM-0864", "ISM-1366", "ISM-1082", "ISM-1083", "ISM-1299", "ISM-0240", "ISM-1196", "ISM-1200", "ISM-1198", "ISM-1199", "ISM-0682", "ISM-0866", "ISM-1145", "ISM-1644", "ISM-0871", "ISM-0870", "ISM-1084", "ISM-0701", "ISM-0702", "ISM-1298", "ISM-1554", "ISM-1555", "ISM-1088", "ISM-1300", "ISM-1556", "ISM-0280", "ISM-0285", "ISM-0286", "ISM-0289", "ISM-0290", "ISM-1551", "ISM-1857", "ISM-1913", "ISM-1858", "ISM-0336", "ISM-1869", "ISM-0294", "ISM-0296", "ISM-0293", "ISM-1599", "ISM-1079", "ISM-0305", "ISM-0307", "ISM-0306", "ISM-0310", "ISM-1598", "ISM-0313", "ISM-1741", "ISM-0311", "ISM-1742", "ISM-1218", "ISM-0312", "ISM-0315", "ISM-0317", "ISM-1219", "ISM-1220", "ISM-1221", "ISM-0318", "ISM-1534", "ISM-1076", "ISM-1222", "ISM-1223", "ISM-1225", "ISM-1226", "ISM-1550", "ISM-1217", "ISM-0321", "ISM-0316", "ISM-1549", "ISM-1359", "ISM-1713", "ISM-0332", "ISM-0323", "ISM-0337", "ISM-0325", "ISM-0330", "ISM-0831", "ISM-1059", "ISM-1600", "ISM-1642", "ISM-0347", "ISM-0947", "ISM-0348", "ISM-0351", "ISM-0352", "ISM-0835", "ISM-0354", "ISM-1065", "ISM-1067", "ISM-0356", "ISM-0357", "ISM-0836", "ISM-0358", "ISM-0359", "ISM-0360", "ISM-1735", "ISM-0363", "ISM-0350", "ISM-1361", "ISM-1160", "ISM-1517", "ISM-1722", "ISM-1723", "ISM-1724", "ISM-1725", "ISM-1726", "ISM-1727", "ISM-0368", "ISM-1728", "ISM-1729", "ISM-0361", "ISM-0362", "ISM-1641", "ISM-0370", "ISM-0371", "ISM-0372", "ISM-0373", "ISM-0839", "ISM-0840", "ISM-0374", "ISM-0378", "ISM-0375", "ISM-1743", "ISM-1407", "ISM-1408", "ISM-1406", "ISM-1608", "ISM-1588", "ISM-1914", "ISM-1409", "ISM-0380", "ISM-0383", "ISM-0341", "ISM-1654", "ISM-1655", "ISM-1492", "ISM-1745", "ISM-1584", "ISM-1491", "ISM-1592", "ISM-0382", "ISM-0843", "ISM-1490", "ISM-1656", "ISM-1870", "ISM-1871", "ISM-1657", "ISM-1658", "ISM-0955", "ISM-1471", "ISM-1392", "ISM-1746", "ISM-1544", "ISM-1659", "ISM-1582", "ISM-0846", "ISM-1660", "ISM-1889", "ISM-1621", "ISM-1622", "ISM-1623", "ISM-1624", "ISM-1341", "ISM-1034", "ISM-1416", "ISM-1417", "ISM-1418", "ISM-0343", "ISM-0345", "ISM-0582", "ISM-0938", "ISM-1467", "ISM-1915", "ISM-1806", "ISM-1470", "ISM-1235", "ISM-1667", "ISM-1668", "ISM-1669", "ISM-1542", "ISM-1859", "ISM-1823", "ISM-1486", "ISM-1485", "ISM-1412", "ISM-1585", "ISM-1670", "ISM-1860", "ISM-1824", "ISM-1601", "ISM-1748", "ISM-1825", "ISM-1671", "ISM-1488", "ISM-1672", "ISM-1673", "ISM-1674", "ISM-1890", "ISM-1487", "ISM-1675", "ISM-1891", "ISM-1676", "ISM-1489", "ISM-1677", "ISM-1826", "ISM-1483", "ISM-1916", "ISM-1246", "ISM-1260", "ISM-1247", "ISM-1245", "ISM-1249", "ISM-1250", "ISM-1827", "ISM-1828", "ISM-1829", "ISM-1830", "ISM-1832", "ISM-1833", "ISM-1834", "ISM-1835", "ISM-1836", "ISM-1837", "ISM-1838", "ISM-1839", "ISM-1840", "ISM-1841", "ISM-1842", "ISM-1843", "ISM-1844", "ISM-1620", "ISM-1845", "ISM-1846", "ISM-1546", "ISM-1603", "ISM-1055", "ISM-1504", "ISM-1679", "ISM-1680", "ISM-1892", "ISM-1893", "ISM-1681", "ISM-1919", "ISM-1173", "ISM-0974", "ISM-1505", "ISM-1401", "ISM-1872", "ISM-1873", "ISM-1874", "ISM-1682", "ISM-1894", "ISM-1559", "ISM-1560", "ISM-1561", "ISM-1920", "ISM-1683", "ISM-0417", "ISM-0421", "ISM-1557", "ISM-0422", "ISM-1558", "ISM-1895", "ISM-1593", "ISM-1227", "ISM-1594", "ISM-1595", "ISM-1596", "ISM-1685", "ISM-1795", "ISM-1619", "ISM-1590", "ISM-1847", "ISM-0418", "ISM-1597", "ISM-1896", "ISM-1861", "ISM-1686", "ISM-1897", "ISM-1749", "ISM-1402", "ISM-1875", "ISM-1403", "ISM-0853", "ISM-0428", "ISM-0408", "ISM-1460", "ISM-1604", "ISM-1605", "ISM-1606", "ISM-1848", "ISM-1607", "ISM-1461", "ISM-0042", "ISM-1211", "ISM-1898", "ISM-1380", "ISM-1687", "ISM-1688", "ISM-1689", "ISM-1385", "ISM-1750", "ISM-1386", "ISM-1387", "ISM-1899", "ISM-1143", "ISM-0298", "ISM-1493", "ISM-1643", "ISM-1807", "ISM-1808", "ISM-1698", "ISM-1699", "ISM-1700", "ISM-1701", "ISM-1702", "ISM-1752", "ISM-1703", "ISM-1900", "ISM-1921", "ISM-1876", "ISM-1690", "ISM-1691", "ISM-1692", "ISM-1901", "ISM-1693", "ISM-1877", "ISM-1694", "ISM-1695", "ISM-1696", "ISM-1902", "ISM-1878", "ISM-1751", "ISM-1879", "ISM-1697", "ISM-1903", "ISM-1904", "ISM-0300", "ISM-1905", "ISM-1704", "ISM-0304", "ISM-1501", "ISM-1753", "ISM-1809", "ISM-1510", "ISM-1547", "ISM-1548", "ISM-1511", "ISM-1810", "ISM-1811", "ISM-1812", "ISM-1813", "ISM-1705", "ISM-1706", "ISM-1814", "ISM-1707", "ISM-1708", "ISM-1515", "ISM-0580", "ISM-0585", "ISM-1405", "ISM-1815", "ISM-0988", "ISM-1906", "ISM-1907", "ISM-0109", "ISM-1228", "ISM-0859", "ISM-0991", "ISM-0400", "ISM-1419", "ISM-1420", "ISM-1422", "ISM-1816", "ISM-0401", "ISM-1780", "ISM-1238", "ISM-1922", "ISM-1923", "ISM-1924", "ISM-1796", "ISM-1797", "ISM-1798", "ISM-1730", "ISM-0402", "ISM-1616", "ISM-1755", "ISM-1756", "ISM-1717", "ISM-1908", "ISM-1754", "ISM-1909", "ISM-0971", "ISM-1849", "ISM-1850", "ISM-1239", "ISM-1552", "ISM-1851", "ISM-1818", "ISM-1817", "ISM-1910", "ISM-1240", "ISM-1241", "ISM-1424", "ISM-1862", "ISM-1275", "ISM-1276", "ISM-1278", "ISM-1536", "ISM-1911", "ISM-1269", "ISM-1277", "ISM-1270", "ISM-1271", "ISM-1272", "ISM-1273", "ISM-1243", "ISM-1256", "ISM-0393", "ISM-1255", "ISM-1268", "ISM-1274", "ISM-1537", "ISM-0264", "ISM-0267", "ISM-0270", "ISM-0271", "ISM-0272", "ISM-1089", "ISM-0565", "ISM-1023", "ISM-0269", "ISM-0569", "ISM-0571", "ISM-0570", "ISM-0567", "ISM-0572", "ISM-1589", "ISM-0574", "ISM-1183", "ISM-1151", "ISM-0861", "ISM-1026", "ISM-1027", "ISM-1540", "ISM-1799", "ISM-1234", "ISM-1502", "ISM-1024", "ISM-0518", "ISM-0516", "ISM-1912", "ISM-1178", "ISM-1781", "ISM-1181", "ISM-1577", "ISM-1532", "ISM-0529", "ISM-0530", "ISM-0535", "ISM-1364", "ISM-0521", "ISM-1186", "ISM-1428", "ISM-1429", "ISM-1430", "ISM-0520", "ISM-1182", "ISM-0385", "ISM-1479", "ISM-1863", "ISM-1006", "ISM-1311", "ISM-1312", "ISM-1028", "ISM-1030", "ISM-1627", "ISM-1628", "ISM-1782", "ISM-1800", "ISM-1304", "ISM-0534", "ISM-1801", "ISM-1314", "ISM-0536", "ISM-1315", "ISM-1710", "ISM-1316", "ISM-1317", "ISM-1318", "ISM-1320", "ISM-1319", "ISM-1332", "ISM-1321", "ISM-1711", "ISM-1322", "ISM-1324", "ISM-1323", "ISM-1327", "ISM-1330", "ISM-1712", "ISM-1454", "ISM-1334", "ISM-1335", "ISM-1338", "ISM-1013", "ISM-1437", "ISM-1579", "ISM-1580", "ISM-1581", "ISM-1438", "ISM-1439", "ISM-1431", "ISM-1436", "ISM-1432", "ISM-0499", "ISM-1802", "ISM-0507", "ISM-1080", "ISM-0457", "ISM-0460", "ISM-0459", "ISM-0469", "ISM-0465", "ISM-0467", "ISM-0455", "ISM-0462", "ISM-0501", "ISM-0142", "ISM-1091", "ISM-0471", "ISM-0994", "ISM-0472", "ISM-1759", "ISM-1629", "ISM-1446", "ISM-0474", "ISM-1761", "ISM-1762", "ISM-0475", "ISM-1763", "ISM-1764", "ISM-0476", "ISM-1765", "ISM-0477", "ISM-1766", "ISM-1767", "ISM-1768", "ISM-1769", "ISM-1770", "ISM-0479", "ISM-1917", "ISM-0481", "ISM-1139", "ISM-1369", "ISM-1370", "ISM-1372", "ISM-1448", "ISM-1373", "ISM-1374", "ISM-1375", "ISM-1553", "ISM-1453", "ISM-1506", "ISM-0484", "ISM-0485", "ISM-1449", "ISM-0487", "ISM-0488", "ISM-0489", "ISM-0490", "ISM-0494", "ISM-0496", "ISM-1233", "ISM-1771", "ISM-1772", "ISM-0998", "ISM-0999", "ISM-0498", "ISM-1000", "ISM-0628", "ISM-0637", "ISM-0631", "ISM-1192", "ISM-1427", "ISM-1520", "ISM-0613", "ISM-1773", "ISM-0611", "ISM-0616", "ISM-0612", "ISM-1774", "ISM-0629", "ISM-0619", "ISM-0622", "ISM-1783", "ISM-0634", "ISM-1037", "ISM-0100", "ISM-0626", "ISM-0597", "ISM-0635", "ISM-1522", "ISM-1521", "ISM-0670", "ISM-1523", "ISM-0610", "ISM-1528", "ISM-0639", "ISM-0643", "ISM-0645", "ISM-1157", "ISM-1158", "ISM-0258", "ISM-0260", "ISM-0261", "ISM-0963", "ISM-0961", "ISM-1237", "ISM-0263", "ISM-0958", "ISM-1236", "ISM-1171", "ISM-0659", "ISM-0651", "ISM-0652", "ISM-1524", "ISM-1293", "ISM-1289", "ISM-1290", "ISM-1288", "ISM-1389", "ISM-0649", "ISM-1284", "ISM-1286", "ISM-1287", "ISM-0677", "ISM-0591", "ISM-1457", "ISM-1480", "ISM-0663", "ISM-1535", "ISM-0661", "ISM-0657", "ISM-1778", "ISM-0664", "ISM-0675", "ISM-0665", "ISM-1187", "ISM-0669", "ISM-1779", "ISM-1586", "ISM-1294", "ISM-0660"]

      for (let i = 0; i < result.length; i++) {
        result[i] = `[${ismID[i]}] ${result[i]}`
      }

      const ismRanked = result.map((sentence, index) => ({
        sentence,
        score: output[index],
      })).sort((a, b) => b.score - a.score);

      // Map ranked results back to the original fileData structure
      const rankedResults = ismRanked.map(rank => {
        const fields = rank.sentence.split('|');
        return {
          Guideline: fields[0],
          Section: fields[1],
          Topic: fields[2],
          Description: fields[3],
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
                <h3 className="text-lg font-bold">{result.Guideline}</h3>
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

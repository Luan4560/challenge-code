import { FormEvent, MouseEvent, useState } from "react"
import { api } from "./lib/axios"

const APIKEY = 'pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa'

// interface DataProps {
//   id: string;
//   images: {
//     fixed_height: {
//       url: string;
//     }
//   }
// }

function App() {
  const [searchTerm, setSearchterm] = useState('')
  const [isLoading, setIsloading] = useState(false)
  const [apiData, setApiData] = useState()
  const [getMoreItems, setGetMoreItems] = useState(5)
  const [page, setPage] = useState(0)

  console.log(apiData)


  const handleSearchTerm = (event: FormEvent<HTMLInputElement>) => {
    const term = event.currentTarget.value

    setSearchterm(term)
  }

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      setIsloading(true)
      const response = await api.get(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${searchTerm}&limit=25&offset=${getMoreItems}&rating=g&lang=en&bundle=messaging_non_clips`)

      setApiData(response.data.data)
      setIsloading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const getData = async (searchTerm: string, page = 0) => {
    const offset = page * 25

    const response = await api.get(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${searchTerm}&limit=25&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`)

    return response.data.data
  }

  const handleGetMoreItems = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = await getData(searchTerm, page + 1)

    setApiData([...apiData, ...data])
    setPage(page + 1)
  }

  const handleClearData = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setApiData(undefined)
    setSearchterm('')
  }


  if (isLoading) {
    return (
      <div style={{
        width: '100%',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h4>Loading...</h4>
      </div>
    )
  }

  return (
    <div>
      <form>
        <input type="text" required placeholder="Search for a GIF"
          value={searchTerm}
          onChange={handleSearchTerm}
        />

        <button onClick={handleClick}>Search</button>
        <button onClick={handleGetMoreItems}>Load More</button>
        <button onClick={handleClearData}>Clear</button>
      </form>

      <div style={{
        width: '100%',
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '4rem',
        gap: '1rem'
      }}>
        {apiData?.map((item) => (
          <div key={item.id}>
            <img src={item.images.fixed_height.url} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

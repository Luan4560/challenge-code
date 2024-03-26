/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, MouseEvent, useState } from "react"
import { Card, Container, Content, Form } from "./styles"
import { clearState, loadGifs, loadMoreGifs } from "../../store/slices/loadDataSlice";
import { useAppDispatch, useAppSelector } from "../../store/index";

export const GifsList = () => {
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchterm] = useState('')
  const [page, setPage] = useState(0)

  const data = useAppSelector((state) => state.gifs.data)

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(loadGifs(searchTerm))
  }

  const handleGetMoreItems = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setPage(page + 1)
    dispatch(loadMoreGifs({ searchTerm, page }))
  }

  const handleClearData = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    dispatch(clearState())
    setSearchterm('')
  }

  return (
    <Container>
      <Form>
        <input type="text" required placeholder="Search for a GIF"
          value={searchTerm}
          onChange={(e: FormEvent<HTMLInputElement>) => setSearchterm(e.currentTarget.value)}
        />
        <button onClick={handleClick}>Search</button>
        <button onClick={handleClearData}>Clear</button>
      </Form>

      <Content>
        {data.map((item: any) => (
          <Card key={item.id}>
            <img src={item.images.original.url} alt="" />
          </Card>
        ))}
      </Content>

      {data.length > 0 && (
        <button onClick={handleGetMoreItems}>Load More</button>
      )}
    </Container>
  )
}
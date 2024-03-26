import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../lib/axios';

const APIKEY = import.meta.env.VITE_API_KEY

export interface DataState {
  data: string[];
  isLoading: boolean;
  error: string | null
}

const initialState: DataState = {
  data: [],
  isLoading: false,
  error: null as string | null
}  

export const loadGifs = createAsyncThunk(
  'gifs/load',
  async (searchTerm: string) => {
    try{
      const response = await api.get(`search?api_key=${APIKEY}&q=${searchTerm}&limit=25&offset=$25&rating=g&lang=en&bundle=messaging_non_clips`)
      
      return response.data.data
    }catch(err) {
      console.error(err)
    }
  }
)

export const loadMoreGifs = createAsyncThunk(
  'gifs/loadMore',
  async({ searchTerm, page }: { searchTerm: string, page: number }) => {
    console.log('test')
    try {
      const offset = page * 25
      const response = await api.get(`search?api_key=${APIKEY}&q=${searchTerm}&limit=25&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`)
      
      return response.data.data
    }catch(err) {
      console.error(err)
    }
  }
)

export const loadGifsSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {
    clearState: (state) => {
      state.data = []
      state.isLoading = false
      state.error = null
    }
  },

  extraReducers(builder) {
    builder.addCase(loadGifs.pending, (state) => {
      state.isLoading = true
      state.error = null
    })

    builder.addCase(loadGifs.fulfilled, (state, action) => {
      state.data = action.payload,
      state.isLoading = false 
    })

    builder.addCase(loadGifs.rejected, (state, action) => {
      state.isLoading = false 
      state.error = action.error.message || 'Failed to fetch data'
    })

    builder.addCase(loadMoreGifs.pending, (state) => {
      state.isLoading = true
      state.error = null
    })

    builder.addCase(loadMoreGifs.fulfilled, (state, action) => {
      state.data = state.data.concat(action.payload)
      state.isLoading = false
    })

    builder.addCase(loadMoreGifs.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || 'Failed to fetch data'
    })
  }
})

export const gifs = loadGifsSlice.reducer
export const { clearState } = loadGifsSlice.actions

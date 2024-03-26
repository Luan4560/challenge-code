import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"
import { GifsList } from "./components/GifList"
import { store } from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <GifsList />
      </ThemeProvider>
    </Provider>
  )
}

export default App

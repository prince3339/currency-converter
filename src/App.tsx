import { SWRConfig } from "swr";
import './App.css'
import CurrencyConverter from './components/pages/CurrencyConverter'
import { fetcher } from "./services/api";

const baseUrl = import.meta.env.VITE_CURRENCY_BEACON_BASE_URL;
const apiKey = import.meta.env.VITE_CURRENCY_BEACON_API_KEY;

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetcher(`${baseUrl}${url}?api_key=${apiKey}`),
      }}
    >
      <div>
        <CurrencyConverter />
      </div>
    </SWRConfig>
  )
}

export default App

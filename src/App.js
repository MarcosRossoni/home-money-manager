import './App.css'
import 'primereact/resources/themes/lara-light-teal/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'
import {PrimeReactProvider} from "primereact/api";
import {AuthProvider} from "./services/auth/auth.jsx";
import RoutesApp from "./routes.jsx";

function App() {

  return (
      <PrimeReactProvider>
        <AuthProvider>
          <RoutesApp/>
        </AuthProvider>
      </PrimeReactProvider>
  )
}

export default App
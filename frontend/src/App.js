import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./pages/HomePage";
import Nopage from "./pages/Nopage";
import Page from "./components/Layout/Page";
import TablePage from "./pages/TablePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/data-table" element={<Page />}>
            <Route index element={<TablePage />} />
          </Route>
          <Route path="/pages/error/500" element={<ErrorPage />} />
          <Route path="/*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

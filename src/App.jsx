import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Auth from "./Auth/Auth";
import { MyOrder } from "./pages/MyOrder";
// import { FoodDetails } from "./pages/Food_ditails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Layout />} /> {/* Keep child routes under Layout */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/myOrder" element={<MyOrder />} />
        {/* <Route path="/details/:id" element={<FoodDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

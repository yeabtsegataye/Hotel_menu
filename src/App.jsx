import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Auth from "./Auth/Auth";
import { MyOrder } from "./pages/MyOrder";
import { useEffect } from "react";
// import { FoodDetails } from "./pages/Food_ditails";

function App() {
  useEffect(() => {
    const userID = localStorage.getItem("id");
    if (!userID) {
      localStorage.setItem(
        "id",
        JSON.stringify(Math.random(10) * 10000000000000000)
      );
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Layout />} />{" "}
        {/* Keep child routes under Layout */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/myOrder" element={<MyOrder />} />
        {/* <Route path="/details/:id" element={<FoodDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

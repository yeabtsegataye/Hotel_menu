import { Routes, Route } from "react-router-dom"; 
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Menu } from "./pages/Menu";
import { FoodDetails } from "./pages/Food_ditails";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Fixed at the top */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/:id/*" element={<Menu />} />
          <Route path="/details/:id" element={<FoodDetails />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;

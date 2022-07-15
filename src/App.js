import React from "react";
import Footer from "./components/footer/Footer";
import Users from "./components/users/Users";

function App() {
  return (
    <main>
      <Users />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;

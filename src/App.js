import "./App.css";
import SidebarWithHeader from "./Components/Menu";
import Carousel from "./Components/Carousel";

function App() {
  return (
    <div className="App">
      <SidebarWithHeader>
        <Carousel />
      </SidebarWithHeader>
    </div>
  );
}

export default App;

import { Routes } from "react-router-dom";
import routes from "./routes/Routes";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);

  return <>{!isLoading ? <Routes>{routes.map((val) => val)}</Routes> : null}</>;
}

export default App;

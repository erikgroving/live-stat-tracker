import Games from "./modules/Games";
import { useState } from 'react';
function App() {
	const [games, setGames] = useState([]);
  return (
    <Games games={games} setGames={setGames}/>
  );
}

export default App;

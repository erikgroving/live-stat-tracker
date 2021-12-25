//import Games from "./modules/Games";
import PlayerTracker from "./modules/PlayerTracker";
import Grid from '@mui/material/Grid';
import axios from 'axios';

import { useState, useEffect } from 'react';

function createNbaDateString() {
    let today = new Date();
	let offset = today.getTimezoneOffset();
	today = new Date(today + offset);
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = today.getDate();
	let date = year.toFixed() + month.toFixed() + day.toFixed();

    return date;
}

function fetchGames(setGames) {
    let date = createNbaDateString();
	const url = `https://data.nba.net/prod/v1/${date}/scoreboard.json`;
	
    axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
        .then(response => {
            if (response.status === 200) {
                return response.data.contents;
            }
            
            throw new Error('Network response was not ok.')
        })
        .then(data => {
            let parsed = JSON.parse(data);
            if (parsed.games !== undefined) {


                let games = parsed.games.map(g => {
                    return {
                        gameId: g.gameId,
                        home: g.hTeam,
                        away: g.vTeam
                    };
                });
                setGames(games);
            }

        });
    
}

async function fetchPlayerStats(games, setPlayerStats) {
    if (games.length === 0) {
        return;
    }
    let date = createNbaDateString();
    let playerStats = []; 
    for (let i = 0; i < games.length; i += 1) {
        let g = games[i];
        const url = `https://data.nba.net/prod/v1/${date}/${g.gameId}_boxscore.json`;
        console.log(url);
        
        //await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
        await axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    return response.data;
                }
                
                throw new Error('Network response was not ok.')
            })
            .then(data => {
                console.log(data);
                let parsed = data;
                if (parsed.stats === undefined) {
                    return;
                }
                let players = parsed.stats.activePlayers;
                console.log(players);
                playerStats.push(players);

            })
            
    }
    setPlayerStats(playerStats);
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

function App() {
    const [games, setGames] = useState([]);
    const [playerStats, setPlayerStats] = useState([]);
    const [playerDict, setPlayerDict] = useState({});

    // Get Today's Games
    if (games.length === 0) {
        fetchGames(setGames);
    }

    // Get players in each game and their stats
    useEffect(() => {
        const interval = setInterval(() => fetchPlayerStats(games, setPlayerStats), 2000);
        return () => clearInterval(interval);
    }, [games, setPlayerStats]);
    
    let pDict = {};
    for (let pSet of playerStats) {
        for (let player of pSet) {
            pDict[player.firstName + ' ' + player.lastName] = player;
        }
    }

    if (isEmptyObject(playerDict) && !isEmptyObject(pDict)) {
        setPlayerDict(pDict);
    }

    return (
        <Grid container>
            {/*<Games games={games}/>*/}
            <PlayerTracker playerDict={playerDict}/>
        </Grid>
    );
}

export default App;

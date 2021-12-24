import Games from "./modules/Games";
import PlayerTracker from "./modules/PlayerTracker";
import Grid from '@mui/material/Grid';

import { useState } from 'react';

function createNbaDateString() {
    let today = new Date();
	let offset = today.getTimezoneOffset();
	today = new Date(today + offset);
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = 23;//today.getDate();
	let date = year.toFixed() + month.toFixed() + day.toFixed();

    return date;
}

function fetchGames(setGames) {
    let date = createNbaDateString();
	const url = `https://data.nba.net/prod/v1/${date}/scoreboard.json`;
	
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            
            throw new Error('Network response was not ok.')
        })
        .then(data => {
            let parsed = JSON.parse(data.contents);
            let games = parsed.games.map(g => {
                return {
                    gameId: g.gameId,
                    home: g.hTeam,
                    away: g.vTeam
                };
            });

            setGames(games);
        });
    
}

var total = 0;
function fetchPlayerStats(games, setPlayerStats) {
    let date = createNbaDateString();
    var playerStats = []; 
    total = 0;
    for (let i = 0; i < games.length; i += 1) {
        let g = games[i];
        const url = `https://data.nba.net/prod/v1/${date}/${g.gameId}_boxscore.json`;
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                
                throw new Error('Network response was not ok.')
            })
            .then(data => {
                let parsed = JSON.parse(data.contents);
                if (parsed.stats === undefined) {
                    total += 1;
                    return;
                }

                let players = parsed.stats.activePlayers;
                playerStats.push(players);
                total += 1;

                if (total === games.length) {
                    setPlayerStats(playerStats);
                }
            })
    }
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
    if (games.length !== 0 && playerStats.length === 0) {
        fetchPlayerStats(games, setPlayerStats);
    }
    
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
            <Games games={games}/>
            <PlayerTracker playerDict={playerDict}/>
        </Grid>
    );
}

export default App;

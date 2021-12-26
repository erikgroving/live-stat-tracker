import Games from "./modules/Games";
import PlayerTracker from "./modules/PlayerTracker";
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    console.log(url);
    axios.get(url)
        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
            
            throw new Error('Network response was not ok.')
        })
        .then(data => {
            
            if (data.games !== undefined) {
                setGames(data.games);
            }

        });
    
}

async function fetchPlayerStats(games, setPlayerDict) {
    if (games.length === 0) {
        return;
    }
    let date = createNbaDateString();
    let playerStats = []; 
    for (let i = 0; i < games.length; i += 1) {
        let g = games[i];
        const url = `https://data.nba.net/prod/v1/${date}/${g.gameId}_boxscore.json?cb=${Date.now()}`;
        
        //await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
        await axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
                
                throw new Error('Network response was not ok.')
            })
            .then(data => {
                let parsed = data;
                if (parsed.stats === undefined) {
                    return;
                }
                let players = parsed.stats.activePlayers;
                playerStats.push(players);

            })
            
    }
    let pDict = {};
    for (let pSet of playerStats) {
        for (let player of pSet) {
            pDict[player.firstName + ' ' + player.lastName] = player;
        }
    }
    if (!isEmptyObject(pDict)) {
        setPlayerDict(pDict);
    }
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

function App() {
    const [games, setGames] = useState([]);
    const [playerDict, setPlayerDict] = useState({});

    // Get Today's Games
    if (games.length === 0) {
        fetchGames(setGames);
    }

    // Get players in each game and their stats
    useEffect(() => {
        const interval = setInterval(() => {
            fetchGames(setGames);
            fetchPlayerStats(games, setPlayerDict)
        }, 2000);
        return () => clearInterval(interval);
    }, [games, setGames, setPlayerDict]);
   
    const theme = createTheme({
        typography: {
        fontFamily: 'Raleway',
    },
    }); 

    return (
        <>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400&display=swap" rel="stylesheet"/>

        
        <ThemeProvider theme={theme}>
            <Grid container spacing={2} sx={{marginTop: '25px'}}>
                <Grid item md={3}>
                    <Games games={games}/>
                </Grid>
                <Grid item md={9}>
                    <PlayerTracker games={games} playerDict={playerDict}/>
                </Grid>
            </Grid>
        </ThemeProvider>
        </>
    );
}

export default App;

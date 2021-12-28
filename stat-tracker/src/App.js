import Games from "./modules/Games";
import PlayerTracker from "./modules/PlayerTracker";
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PlayByPlay from "./modules/PlayByPlay";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { Typography } from "@mui/material";
import Tabs from '@mui/material/Tabs';

function createNbaDateString() {
    let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = today.getDate();
	let date = year.toFixed() + month.toFixed() + day.toFixed();

    return date;
}

function fetchGames(setGames) {
    let date = createNbaDateString();
	const url = `https://data.nba.net/prod/v1/${date}/scoreboard.json?cb=${Date.now()}`;
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

async function fetchPlayByPlay(games, playByPlay, setPlayByPlay, playByPlayDict, setPlayByPlayDict, playsSeen, setPlaysSeen) {
    if (games.length === 0) {
        return;
    }
    let date = createNbaDateString();

    for (let g of games) {
        if (g.statusNum !== 2) {
            continue;
        }
        
        const url = `https://data.nba.net/data/10s/json/cms/noseason/game/${date}/${g.gameId}/pbp_all.json?cb=${Date.now()}`;
        
        await axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
                
                throw new Error('Network response was not ok.')
            })
            .then(data => {
                let gameKey = g.gameId;
                if (!playsSeen.hasOwnProperty(gameKey)) {
                    playsSeen[gameKey] = 0;
                }
                for (let i = playsSeen[gameKey]; i < data.sports_content.game.play.length; i++) {
                    let play = data.sports_content.game.play[i]
                    if (play.period && play.description && play.clock) {
                        let key = play.period + play.clock + play.team_abr + play.event + play.description;
                        if (playByPlayDict.hasOwnProperty(key)) {
                            continue;
                        }
                        let desc = play.description;

                        let splits = desc.split(']', 2);

                        if (splits.length !== 1) {
                            play.team = splits[0].slice(1);
                            play.description = splits[1]; 
                        }
                        else {
                            playByPlayDict[key] = play;
                            continue;
                        }
                        
                        playByPlay.push(play);
                        playByPlayDict[key] = play;
                    }
                }
                playsSeen[gameKey] = data.sports_content.game.play.length;
            })        
    }
    setPlaysSeen(playsSeen);
    setPlayByPlay(playByPlay);
    setPlayByPlayDict(playByPlayDict);
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function App() {
    const [games, setGames] = useState([]);
    const [playerDict, setPlayerDict] = useState({});
    const [trackedPlayers, setTrackedPlayers] = useState([]);

    const [playByPlay, setPlayByPlay] = useState([]);
    const [playsSeen, setPlaysSeen] = useState({});
    const [playByPlayDict, setPlayByPlayDict] = useState([]);
    
    const [tabId, setTabId] = useState('1');


    // Get Today's Games
    if (games.length === 0) {
        fetchGames(setGames);
    }

    // Get players in each game and their stats
    useEffect(() => {
        const interval = setInterval(() => {
            fetchGames(setGames);
            fetchPlayerStats(games, setPlayerDict)
            fetchPlayByPlay(games, playByPlay, setPlayByPlay, playByPlayDict, setPlayByPlayDict, playsSeen, setPlaysSeen);
        }, 2000);
        return () => clearInterval(interval);
    }, [games, setGames, setPlayerDict, playByPlay, setPlayByPlay, playByPlayDict, setPlayByPlayDict, playsSeen, setPlaysSeen]);
   
    const theme = createTheme({
        typography: {
        fontFamily: 'Raleway',
    },
    }); 


    const handleTabChange = (event, newValue) => {
        setTabId(newValue);
    };    

    return (
        <>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;600&display=swap" rel="stylesheet"></link>
        
        <ThemeProvider theme={theme}>
            <Box sx={{height: '100%', width: '100%', overflow: 'auto'}}>
                <Grid container spacing={2} sx={{marginTop: '25px'}}>
                    <Grid sx={{paddingBottom: '50px'}} item md={3}>
                        <Games games={games}/>
                    </Grid>
                    <Grid item md={9}>
                        <Tabs
                            value={tabId}
                            onChange={handleTabChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                        >
                            <Tab label="Live Stats and Play-by-Play" />
                            <Tab label="Research Player Stats" />
                        </Tabs>

                        <TabPanel value={tabId} index={0} dir={theme.direction}>
                            <Grid item md={12}>
                                <PlayerTracker games={games} playerDict={playerDict} trackedPlayers={trackedPlayers} setTrackedPlayers={setTrackedPlayers}/>
                            </Grid>
                            <Grid item md={12}>
                                <PlayByPlay playByPlay={playByPlay} trackedPlayers={trackedPlayers}/>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={tabId} index={1} dir={theme.direction}>
                        </TabPanel>
        
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
        </>
    );
}

export default App;

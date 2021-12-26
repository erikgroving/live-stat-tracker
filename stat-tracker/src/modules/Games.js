import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Games({ games }) {
	if (games.length === 0) {
		return (
			<p>Loading today's games...</p>
		)
	}
    return (
		<Grid container sx={{paddingLeft: '50px'}}>
			<Grid item md={12}>
				<Typography>
				Today's Games
				</Typography>
			</Grid>
			{
				games.map(game =>  {
					return (
					<Grid key={game.hTeam.triCode} style={{paddingTop: '25px'}}>
						<Card sx={{minWidth: 250, maxHeight: 150}}>
							<CardContent>
								<Typography>
									{game.hTeam.triCode + ' (' + game.hTeam.win + '-' + game.hTeam.loss + ') at ' + game.vTeam.triCode + ' (' + game.vTeam.win + '-' + game.vTeam.loss + ')'}
								</Typography>
								
								{game.hTeam.seriesWin && game.vTeam.seriesWin ?
								<Typography>
									{game.hTeam.triCode + ' is ' + game.hTeam.seriesWin + '-' + game.vTeam.seriesWin + ' against ' + game.vTeam.triCode }
								</Typography>
								: ''
								}
							
								
								<Typography key={game.hTeam.triCode + game.vTeam.triCode + game.period.current + game.clock} sx={{fontSize: '20px'}} className="fade-in">
									{game.statusNum === 2  ?
									game.period.isHalftime === true ? 'Halftime' : 
										'Q' + game.period.current + ' ' + game.clock : ''}
								</Typography>
									
								
								{game.hTeam.score && game.vTeam.score ?	
									<Typography key={game.hTeam.triCode + game.vTeam.triCode + game.hTeam.score + game.vTeam.score} className="fade-in" sx={{fontSize: '28px'}}>
										{game.hTeam.score + ' - ' + game.vTeam.score}
									</Typography>
									: ''
								}
								
						
							</CardContent>
						</Card>
					</Grid>
					)
				})
			}

		</Grid>
    );
}
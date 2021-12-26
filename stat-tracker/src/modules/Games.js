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
		<Grid container justifyContent="center" sx={{paddingLeft: '50px'}}>
			<Grid item md={12}>
				<Typography>
				Today's Games
				</Typography>
			</Grid>
			{
				games.map(game =>  {
					return (
					<Grid container spacing={2} style={{paddingTop: '25px'}}>
						<Card sx={{minWidth: 250}}>
							<CardContent>
								<Typography>
									{game.hTeam.triCode + ' (' + game.hTeam.win + '-' + game.hTeam.loss + ') vs. ' + game.vTeam.triCode + ' (' + game.vTeam.win + '-' + game.vTeam.loss + ')'}
								</Typography>
								<Typography>
									{game.hTeam.triCode + ' (' + game.hTeam.seriesWin + '-' + game.vTeam.seriesWin + ') ' + game.vTeam.triCode }
								</Typography>
						
							</CardContent>
						</Card>
					</Grid>
					)
				})
			}

		</Grid>
    );
}
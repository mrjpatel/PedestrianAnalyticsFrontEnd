import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = theme => ({
    root: {
        width: '100%',
        position: 'sticky',
    },
    footer: {
        backgroundColor: 'rgba(255, 0, 0, 0.15)',
        padding: '100px 0px 100px 0px',
        marginTop: '500px'
    },
});

class Home extends Component{
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid className={classes.footer} item xs={12}>
                    <Typography
                        variant="subheading"
                        component={'span'}
                        align={"center"}
                        color={"textPrimary"}
                    >
                        TEST
                    </Typography>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Home);
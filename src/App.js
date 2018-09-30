import React from 'react';
import './App.css';
import {AppBar, Typography, Toolbar, Tabs, Tab, Menu, MenuItem, IconButton, Grid}from "@material-ui/core/";
import withStyles from "@material-ui/core/es/styles/withStyles";
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom/";
import Main from "./components/main";

const styles = theme => ({
    root: {
        width: '100%',
        margin: 0,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        textDecoration: 'none',
        '&:hover': {
            color: '#EDE7F6'},
        [theme.breakpoints.up('xs')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    content: {
        marginTop: "75px",
        width: '100%',
        position: 'sticky',
    },
    footer: {
        width: '100%',
        position: 'sticky',
    },
    footerGrid: {
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        padding: '10px 0px 10px 0px',
        marginTop: '100px'
    },
});

const Home = props => <Link to="/" {...props} />;
const Map = props => <Link to="/mapView" {...props} />;
const AnalyseData = props => <Link to="/analyseData" {...props} />;
const Faq = props => <Link to="/faq" {...props} />;

class App extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const {mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const { value } = this.state;
        const currentYear = new Date().getFullYear();

        const renderMobileMenu =
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={this.handleMobileMenuClose}
        >
            <MenuItem component={Home}>Home</MenuItem>
            <MenuItem component={Map}>Map</MenuItem>
            <MenuItem component={AnalyseData}>Analyse Data </MenuItem>
            <MenuItem component={Faq}>FAQ</MenuItem>
        </Menu>;

        return (
            <div className={classes.root}>
                <AppBar position={"fixed"}>
                    <Toolbar>
                        <Typography className={classes.title} variant="title" color="inherit" noWrap component={Home}>
                            PEDESTRIAN ANALYTICS
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Tabs value={value}  indicatorColor="primary"
                                  textColor="inherit" onChange={this.handleChange}>
                                <Tab label="Home" component={Home}/>
                                <Tab label="Map View" component={Map}/>
                                <Tab label="Analyse Data" component={AnalyseData}/>
                                <Tab label="FAQ" component={Faq}/>
                            </Tabs>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MenuIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

                <div className={classes.content}>
                    <Main/>
                </div>

                <div className={classes.footer}>
                    <Grid className={classes.footerGrid} item xs={12}>
                        <Typography
                            variant="subheading"
                            component={'span'}
                            align={"center"}
                            color={"textPrimary"}
                        >
                            © {currentYear} Japan Patel
                        </Typography>
                    </Grid>
                </div>
                {renderMobileMenu}
            </div>
        );
    }
}
export default withStyles(styles)(App);

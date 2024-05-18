import  Typography  from "@mui/material/Typography";
import  Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Cart from "../Cart";

function Header() {
    return (
        <AppBar position="static" color="primary" elevation={0}>
            <Container maxWidth="xl">
                <Toolbar 
                disableGutters 
                sx={{ display: "flex", justifyContent: "space-between" }} 
                >
                    <Typography variant="h6" href="/" noWrap component="a" sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: '700',
                        letterSpacing: '0.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        // flexGrow: 1,
                        cursor: 'pointer'
                    }}>
                        Candy Heaven
                    </Typography>
                    <Cart />
                    
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
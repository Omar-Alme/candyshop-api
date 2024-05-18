import  Typography  from "@mui/material/Typography";
import  Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Badge
 } from "@mui/material";

function Header() {
    return (
        <AppBar position="static" color="primary" elevation={0}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" href="/" noWrap component="a" sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: '700',
                        letterSpacing: '0.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        flexGrow: 1,
                        cursor: 'pointer'
                    }}>
                        Candy Heaven
                    </Typography>

                    <Badge badgeContent={1} color="secondary" sx={{ p: 0, cursor: "pointer"}}>
                        <ShoppingBagIcon />
                    </Badge>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
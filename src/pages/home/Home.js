import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


export default function Home() {
    const classes = useStyles();

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">PetShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link href="/cadastrarCliente">Cadastrar cliente</Nav.Link>
                            <Nav.Link href="/cadastrarAnimal">Cadastrar animal</Nav.Link>
                            <Nav.Link href="/manterClientes">Manter clientes</Nav.Link>
                            <Nav.Link href="/manterAnimais">Manter animais</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className={classes.root}>
                <Paper elevation={10}>
                    <h1 style={{padding: "10px"}}>Bem vindo ao sistema do Petshop!</h1>
                    <h2 style={{padding: "10px"}}>Suponha que aqui tem Texto, imagens e etc...</h2>
                </Paper>
            </div>
        </div>
    )
}
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Avatar from '@material-ui/core/Avatar';
import Logo from "./logo.png";

export default function NavBar(){
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Avatar alt="Logo Petshop" src={Logo} />
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
    )
}
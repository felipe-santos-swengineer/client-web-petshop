import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import validator from 'validator';


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
    root1: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    cadastrar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "10px",
    },
}));


export default function Home() {
    const classes = useStyles();

    function CadastrarCliente() {
        console.log("Validando...");
        var nomeCliente = document.getElementById("nomeCliente").value;
        var telefoneCliente = document.getElementById("telefoneCliente").value;
        var enderecoCliente = document.getElementById("enderecoCliente").value;
        var cpfCliente = document.getElementById("cpfCliente").value;

        //tratamentos
        if (nomeCliente === "" || telefoneCliente === "" || enderecoCliente === "" || cpfCliente === "") {
            alert("Há campos incompletos");
            return;
        };


        if (validator.isAlpha(nomeCliente.replace(" ", "")) === false) {
            alert("nome do cliente está mal formatado ou contem acentos");
            return;
        }

        if (validator.isNumeric(telefoneCliente) === false) {
            alert("telefone está mal formatado");
            return;
        }

        if (validator.contains(cpfCliente, ".") === true) {
            alert("cpf do cliente está mal formatado");
            return;
        }

        if (validator.isNumeric(cpfCliente) === false) {
            alert("cpf do cliente está mal formatado");
            return;
        }

        if (cpfCliente.length !== 11) {
            alert("cpf do cliente está mal formatado");
            return;
        }

        var myJson = {
            "nomeCliente": nomeCliente,
            "telefoneCliente": telefoneCliente,
            "enderecoCliente": enderecoCliente,
            "cpfCliente": cpfCliente
        };

        console.log(myJson);
        
        //inserção no banco de clientes
        const insertCliente = async () => {
            console.log("Inserindo...")
            try {
                const body = myJson;
                const response = await fetch("http://localhost:5000/clientes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                console.log(response)
                /*
                window.location = "/";
                */
                if (response.status === 200) {
                    alert("Cadastro bem sucedido");
                }

            } catch (err) {
                alert("Falha no cadastro");
            }
        }


        //verificar se registro já existe
        const validarInsert = async () => {

            try {
                const response = await fetch("http://localhost:5000/clientes/" + myJson.cpfCliente,
                    {
                        method: "GET",
                    }
                );


                var resJSON = await response.json();


                if(resJSON.cpf === myJson.cpfCliente){
                    alert("Já existe cliente com esse CPF");
                }
                else{
                    insertCliente();
                }

            } catch (err) {
                alert(err);
            }

        }

        validarInsert();

    }

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
                    <form className={classes.root1} noValidate autoComplete="off">
                        <TextField
                            id="nomeCliente"
                            label="Nome do Cliente"
                            placeholder="Ex: Maria Silva"
                            multiline
                            variant="outlined"
                        />
                        <TextField
                            id="telefoneCliente"
                            label="Telefone"
                            placeholder="Ex: Apenas números"
                            multiline
                            variant="outlined"
                        />
                        <TextField
                            id="enderecoCliente"
                            label="Endereço"
                            placeholder="Ex: Rua Ali Baba"
                            multiline
                            variant="outlined"
                        />
                        <TextField
                            id="cpfCliente"
                            label="CPF"
                            placeholder="Somente Números"
                            multiline
                            variant="outlined"
                        />
                    </form>
                </Paper>
            </div>
            <div className={classes.cadastrar}>
                <Button variant="contained" color="primary" onClick={CadastrarCliente}>
                    Cadastrar
                </Button>
            </div>
        </div>
    )
}
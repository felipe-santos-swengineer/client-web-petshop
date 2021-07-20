import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import validator from 'validator';


const tipos = [
    {
        value: 'Cachorro',
        label: 'Cachorro',
    },
    {
        value: 'Gato',
        label: 'Gato',
    }
];



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
    const [tipo, setTipo] = React.useState('Cachorro');

    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };


    function cadastrarAnimal(){
        console.log("Cadastrando...");
        var tipoAnimal = tipo;
        var nomeAnimal = document.getElementById("nomeAnimal").value;
        var idadeAnimal = document.getElementById("idadeAnimal").value;
        var pesoAnimal = document.getElementById("pesoAnimal").value;
        var racaAnimal = document.getElementById("racaAnimal").value;
        var cpfDono = document.getElementById("cpfDono").value;

        cpfDono = cpfDono.replace(" ","");
        idadeAnimal = idadeAnimal.replace(" ","");
        pesoAnimal = pesoAnimal.replace(" ","");

        //tratamentos
        if(nomeAnimal === "" || idadeAnimal === "" || pesoAnimal === "" || racaAnimal ===""
            || cpfDono === ""){
                alert("Há campos incompletos");
                return;
        };

        if(validator.contains(idadeAnimal,".") === true){
            alert("idade do animal está mal formatado");
            return;
        }

        if(validator.isNumeric(idadeAnimal) === false){
            alert("idade do animal está mal formatado");
            return;
        }

        if(validator.isNumeric(pesoAnimal) === false){
            alert("peso do animal está mal formatado");
            return;
        }

        if(validator.contains(cpfDono,".") === true){
            alert("cpf do dono está mal formatado");
            return;
        }

        if(validator.isNumeric(cpfDono) === false){
            alert("cpf do dono está mal formatado");
            return;
        }

        if(cpfDono.length !== 11){
            alert("cpf do dono está mal formatado");
            return;
        }


        var myJson = {
            "nomeAnimal" : nomeAnimal,
            "idadeAnimal": idadeAnimal,
            "tipoAnimal": tipoAnimal,
            "pesoAnimal": pesoAnimal,
            "racaAnimal": racaAnimal,
            "cpfDono": cpfDono
        };

        console.log(myJson);

        const insertAnimal = async() => {
            try {
                const body = myJson;
                const response = await fetch("http://localhost:5000/animais", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                //window.location = "/";
                console.log(response);
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
                const response = await fetch("http://localhost:5000/clientes/" + myJson.cpfDono,
                    {
                        method: "GET",
                    }
                );


                var resJSON = await response.json();


                if(resJSON.cpf === myJson.cpfDono){
                    insertAnimal();
                }
                else{
                    alert("Não existe cliente com esse CPF");
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
                            id="outlined-select-currency-native"
                            select
                            label="Tipo"
                            value={tipo}
                            onChange={handleChangeTipo}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                        >
                            {tipos.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="nomeAnimal"
                            label="Nome do Animal"
                            placeholder="Ex: Rex"
                            multiline
                            variant="outlined"
                        />
                        <TextField
                            id="idadeAnimal"
                            label="Idade do Animal (Em anos)"
                            placeholder="Ex: 2"
                            multiline
                            variant="outlined"
                        />
                        <TextField
                            id="pesoAnimal"
                            label="Peso do Animal"
                            placeholder="Ex: 10.1"
                            multiline
                            variant="outlined"
                        />
                        <TextField
                            id="racaAnimal"
                            label="Raça do Animal"
                            placeholder="Ex: Labrador"
                            multiline
                            variant="outlined"
                        />
                        <TextField
                            id="cpfDono"
                            label="CPF do Dono"
                            placeholder="Somente Números"
                            multiline
                            variant="outlined"
                        />
                    </form>
                </Paper>
            </div>
            <div className={classes.cadastrar}>
                <Button variant="contained" color="primary" onClick={cadastrarAnimal}>
                    Cadastrar
                </Button>
            </div>
        </div>
    )
}
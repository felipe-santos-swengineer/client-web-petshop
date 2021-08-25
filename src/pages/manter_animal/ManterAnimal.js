import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';


function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: top + "%",
        left: left + "%",
        transform: "translate(-" + top + "%,-" + left + "%)",
    };
}


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
    typography: {
        padding: theme.spacing(2),
    },
    root1: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    },
}));

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



export default function ManterAnimal() {
    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();
    const [animais, setAnimais] = useState([]);
    const [nome, setNome] = useState();
    const [idade, setIdade] = useState();
    const [tipo, setTipo] = React.useState('Cachorro');
    const [raca, setRaca] = useState();
    const [peso, setPeso] = useState();
    const [open, setOpen] = React.useState(false);
    const [editID, setEditID] = useState();

    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };

    //pegar registros de animais
    const getAnimais = async () => {
        try {
            const response = await fetch("http://localhost:5000/animais",
                {
                    method: "GET",
                }
            );
            var resJSON = await response.json();
            setAnimais(resJSON);

        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        getAnimais();
    }, []);

    console.log(animais);


    const handleOpen = (id) => {
        setEditID(id);
        setOpen(true);

        //preencher campos com registro atual 
        for (var i = 0; i < animais.length; i++) {
            if (animais[i].id === id) {
                setNome(animais[i].nome);
                setPeso(animais[i].peso);
                setIdade(animais[i].idade);
                setRaca(animais[i].raca);
                setTipo(animais[i].tipo);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    //atualizar registros
    const atualizarAnimal = async () => {
        console.log(editID);
        console.log(nome);
        console.log(peso);
        console.log(raca);
        console.log(idade);
        console.log(tipo);

        if (nome === "" || peso === "" || raca === "" || idade === "") {
            alert("Há campos incompletos");
            return;
        }

        //tratamentos
        setIdade(idade.replace(" ", ""));
        setPeso(peso.replace(" ", ""));

        try {
            const body = { nome, peso, raca, idade, tipo };
            const response = await fetch(`http://localhost:5000/animais/` + editID,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            console.log(response.json);
            alert("Animal Atualizado");
            handleClose();
            window.location = "/manterAnimais";

        } catch (err) {
            console.error(err.message);
        }
    }

    const handleDelete = (deleteId) => {
        console.log("Id a ser deletado: " + deleteId)
        deletarAnimal(deleteId);
        return;
    }

    const deletarAnimal = async(deleteId) => {
        try {
            const deleteAnimal = await fetch(`http://localhost:5000/animais/` + deleteId, {
                method: "DELETE"
            });
            console.log(deleteAnimal.json);
            alert("Animal Deletado");
            window.location = "/manterAnimais";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className={classes.root}>
                <Paper elevation={10} style={{overflowX: "scroll", overflowY: "scroll"}}>
                    <h1 style={{ textAlign: "center", marginTop: "10px" }}>Animais</h1>
                    <Fragment>
                        {" "}
                        <table className="table mt-5 text-center">
                            <thead>
                                <tr>
                                    <th>CPF do Dono</th>
                                    <th>Nome</th>
                                    <th>Tipo</th>
                                    <th>Raça</th>
                                    <th>Peso</th>
                                    <th>Idade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {animais.map(animal => (
                                    <tr key={animal.id}>
                                        <td>{animal.cpfdono}</td>
                                        <td>{animal.nome}</td>
                                        <td>{animal.tipo}</td>
                                        <td>{animal.raca}</td>
                                        <td>{animal.peso}</td>
                                        <td>{animal.idade}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleOpen(animal.id)}
                                            >
                                                Editar
                                            </button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="simple-modal-title"
                                                aria-describedby="simple-modal-description"
                                            >
                                                <div style={modalStyle} className={classes.paper}>
                                                    <form noValidate autoComplete="off">
                                                        <TextField
                                                            style={{ marginBottom: "10px", marginTop: "10px" }}
                                                            id="nomeAnimal"
                                                            label="Nome do Animal"
                                                            placeholder="Ex: Rex"
                                                            multiline
                                                            variant="outlined"
                                                            value={nome}
                                                            onChange={e => setNome(e.target.value)}
                                                        />
                                                        <TextField
                                                            style={{ marginBottom: "10px", marginTop: "10px" }}
                                                            id="idadeAnimal"
                                                            label="Idade do Animal (Em anos)"
                                                            placeholder="Ex: 2"
                                                            multiline
                                                            variant="outlined"
                                                            value={idade}
                                                            onChange={e => setIdade(e.target.value)}
                                                        />
                                                        <TextField
                                                            style={{ marginBottom: "10px", marginTop: "10px" }}
                                                            id="pesoAnimal"
                                                            label="Peso do Animal"
                                                            placeholder="Ex: 10.1"
                                                            multiline
                                                            variant="outlined"
                                                            value={peso}
                                                            onChange={e => setPeso(e.target.value)}
                                                        />
                                                        <TextField
                                                            style={{ marginBottom: "10px", marginTop: "10px" }}
                                                            id="racaAnimal"
                                                            label="Raça do Animal"
                                                            placeholder="Ex: Labrador"
                                                            multiline
                                                            variant="outlined"
                                                            value={raca}
                                                            onChange={e => setRaca(e.target.value)}
                                                        />
                                                        <TextField
                                                            style={{ marginBottom: "10px", marginTop: "10px" }}
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
                                                    </form>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <button
                                                            className="btn btn-success"
                                                            onClick={atualizarAnimal}
                                                            style={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }}
                                                        >
                                                            Editar
                                                        </button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(animal.id)}
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Fragment>
                </Paper>
            </div>
        </div>
    )
}
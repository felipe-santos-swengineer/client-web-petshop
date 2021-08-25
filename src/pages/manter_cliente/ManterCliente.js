import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import validator from 'validator';


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


export default function ManterCliente() {
    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();
    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState();
    const [endereco, setEndereco] = useState();
    const [telefone, setTelefone] = useState();
    const [open, setOpen] = React.useState(false);
    const [editID, setEditID] = useState();

    //pegar registros de clientes
    const getClientes = async () => {
        try {
            const response = await fetch("http://localhost:5000/clientes",
                {
                    method: "GET",
                }
            );
            var resJSON = await response.json();
            setClientes(resJSON);

        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        getClientes();
    }, []);

    console.log(clientes);


    const handleOpen = (id) => {
        setEditID(id);
        setOpen(true);

        //preencher campos com registro atual 
        for (var i = 0; i < clientes.length; i++) {
            if (clientes[i].id === id) {
                setNome(clientes[i].nome);
                setEndereco(clientes[i].endereco);
                setTelefone(clientes[i].telefone);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    //atualizar registros
    const atualizarCliente = async () => {
        console.log(editID);
        console.log(nome);
        console.log(endereco);
        console.log(telefone);


        if (nome === "" || endereco === "" || telefone === "") {
            alert("Há campos vazios!");
            return;
        }

        setTelefone(telefone.replace(" ", ""));

        if (validator.isAlpha(nome.replace(" ", "")) === false) {
            alert("nome do cliente está mal formatado ou contem acentos");
            return;
        }

        if (validator.isNumeric(telefone) === false) {
            alert("telefone está mal formatado");
            return;
        }


        try {
            const body = { nome, telefone, endereco };
            const response = await fetch(`http://localhost:5000/clientes/` + editID,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            console.log(response.json)
            alert("Cliente Atualizado");
            handleClose();
            window.location = "/manterClientes";

        } catch (err) {
            console.error(err.message);
        }
    }

    const handleDelete = (deleteCPF) => {
        console.log("ClienteCPF a ser deletado: " + deleteCPF);
        deleteCliente(deleteCPF);
        return;
    }

    const deleteCliente = async (deleteCPF) => {
        
        try {
            const deletecliente = await fetch(`http://localhost:5000/clientes/` + deleteCPF, {
                method: "DELETE"
            });

            var resJSON = await deletecliente.json();

            alert(resJSON);
            window.location = "/manterClientes";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className={classes.root}>
                <Paper elevation={10} style={{overflowX: "scroll", overflowY: "scroll"}}>
                    <h1 style={{ textAlign: "center", marginTop: "10px" }}>Clientes</h1>
                    <Fragment>
                        {" "}
                        <table className="table mt-5 text-center">
                            <thead>
                                <tr>
                                    <th>CPF</th>
                                    <th>Nome</th>
                                    <th>Telefone</th>
                                    <th>Endereço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map(cliente => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.cpf}</td>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.telefone}</td>
                                        <td>{cliente.endereco}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleOpen(cliente.id)}
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
                                                            id="nomeCliente"
                                                            label="Nome do Cliente"
                                                            placeholder="Ex: Maria Silva"
                                                            multiline
                                                            variant="outlined"
                                                            value={nome}
                                                            onChange={e => setNome(e.target.value)}

                                                        />
                                                        <TextField
                                                            style={{ marginBottom: "10px", marginTop: "10px" }}
                                                            id="telefoneCliente"
                                                            label="Telefone"
                                                            placeholder="Ex: Apenas números"
                                                            multiline
                                                            variant="outlined"
                                                            value={telefone}
                                                            onChange={e => setTelefone(e.target.value)}
                                                        />
                                                        <TextField
                                                            style={{ marginBottom: "10px", marginTop: "10px" }}
                                                            id="enderecoCliente"
                                                            label="Endereço"
                                                            placeholder="Ex: Rua Ali Baba"
                                                            multiline
                                                            variant="outlined"
                                                            value={endereco}
                                                            onChange={e => setEndereco(e.target.value)}
                                                        />
                                                    </form>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <button
                                                            className="btn btn-success"
                                                            onClick={atualizarCliente}
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
                                                onClick={() => handleDelete(cliente.cpf)}
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
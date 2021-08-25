import NavBar from "../../components/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Chart } from "react-google-charts";
import React, { useEffect, useState } from "react";


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
    const [options, setOptions] = useState();
    const [optionsBar, setOptionsBar] = useState();
    const [data, setData] = useState([]);
    const [dataBar, setDataBar] = useState([]);
    var clientes = [];
    var animais = [];

    const getClientes = async () => {
        try {
            const response = await fetch("http://localhost:5000/clientes",
                {
                    method: "GET",
                }
            );
            var resJSON = await response.json();
            clientes = resJSON;
            getAnimais();

        } catch (err) {
            alert(err);
        }
    }
    const getAnimais = async () => {
        try {
            const response = await fetch("http://localhost:5000/animais",
                {
                    method: "GET",
                }
            );
            var resJSON = await response.json();
            animais = resJSON;
            preencherTabelas();
            

        } catch (err) {
            alert(err);
        }
    }

    const preencherTabelas = () => {

        var quant_clientes = clientes.length;
        var quant_animais = animais.length;
        console.log(quant_clientes);
        console.log(quant_animais);
        
        setOptions({
            title: 'Proporção de cadastros'
        });

        setOptionsBar({
            title: 'Animais por tipo'
        });

        if (quant_clientes === 0) {
            setData(
                [
                    ['A', 'Usuários inseridos'],
                    ['Nenhum cliente ou animal Inserido', 1],

                ]
            )
        }
        else {
            setData(
                [
                    ['A', 'Usuarios inseridos'],
                    ['Clientes', quant_clientes],
                    ['Animais', quant_animais],
                ]
            )
        }

        var quant_cachorros = 0;
        var quant_gatos = 0;

        for(var i = 0; i < animais.length; i++){
            if(animais[i].tipo === "Cachorro"){
                quant_cachorros += 1;
            }
            else{
                quant_gatos += 1;
            }
        }

        setDataBar(
            [
                ['Raças', 'Quantidade', 'Total de animais'],
                ['Cachorro', quant_cachorros, quant_animais],
                ['Gato', quant_gatos, quant_animais],
               
            ]
        )
    }

    useEffect(() => {
        getClientes();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <NavBar></NavBar>
            <div className={classes.root}>
                <Paper elevation={10} style={{overflowX: "scroll", overflowY: "scroll"}}>
                    <h1 style={{padding: "10px"}}>Bem vindo ao sistema do Petshop!</h1>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        data={data}
                        options={options}
                    />
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="BarChart"
                        data={dataBar}
                        options={optionsBar}
                    />
                </Paper>
            </div>
        </div>
    )
}
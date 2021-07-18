import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//pages import
import Home from "./pages/home/Home.js";
import CadastrarCliente from "./pages/cadastro_cliente/CadastroCliente";
import CadastrarAnimal from "./pages/cadastro_animal/CadastroAnimal";


function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/cadastrarCliente" component={CadastrarCliente} />
                <Route path="/cadastrarAnimal" component={CadastrarAnimal} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
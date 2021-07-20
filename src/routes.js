import React from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";

//pages import
import Home from "./pages/home/Home.js";
import CadastrarCliente from "./pages/cadastro_cliente/CadastroCliente";
import CadastrarAnimal from "./pages/cadastro_animal/CadastroAnimal";
import ManterCliente from "./pages/manter_cliente/ManterCliente";
import ManterAnimal from "./pages/manter_animal/ManterAnimal";


function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/cadastrarCliente" component={CadastrarCliente} />
                <Route path="/cadastrarAnimal" component={CadastrarAnimal} />
                <Route path="/manterClientes" component={ManterCliente} />
                <Route path="/manterAnimais" component={ManterAnimal} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
import React from "react";

//include images into your bundle
import { Input } from "./input.js";
import { Lista } from "./listgroup.js";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			value: "",
			tareas: []
		};

		this.controlaCambio = this.controlaCambio.bind(this);
		this.controlaSubmit = this.controlaSubmit.bind(this);
		this.eliminaTarea = this.eliminaTarea.bind(this);
	}
	controlaCambio(evento) {
		this.setState({ value: evento.target.value });
	}

	controlaSubmit(evento) {
		const nuevaTarea = this.state.tareas.slice();
		nuevaTarea.push(this.state.value);
		this.setState({ tareas: nuevaTarea });
		evento.preventDefault();
		this.setState({ value: "" });
	}

	eliminaTarea(index) {
		let tareas = this.state.tareas.slice();
		tareas.splice(index, 1);
		this.setState({ tareas: tareas });
	}

	render() {
		const contador = this.state.tareas.length;
		const tareasVacio = this.state.tareas.length > 0;

		fetch("https://assets.breatheco.de/apis/fake/todos/user/tata", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				//console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//this.setState({ tareas: datos.label }); //here is were your code should start after the fetch finishes
				console.log(data.label); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});

		return (
			<div className="container bg-light">
				<div className="row">
					<div className="col" />
					<div className="col-6">
						<div className="text-center mt-5">
							<h1>todos</h1>
							<br />
							<p>usar este tag como prueba</p>
							<Input
								value={this.state.value}
								controlCambio={this.controlaCambio}
								controlSubmitt={this.controlaSubmit}
							/>
							{tareasVacio ? (
								<Lista
									contador={contador}
									lista={this.state.tareas}
									elimina={this.eliminaTarea}
									muestraBoton={this.toggleHover}
									estadoHover={this.state.hover}
								/>
							) : (
								<ul className="list-group list-group-flush">
									<li className="list-group-item text-left">
										No tasks, add a task
									</li>
								</ul>
							)}
						</div>
					</div>
					<div className="col" />
				</div>
			</div>
		);
	}
}

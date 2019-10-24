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
		this.eliminaTodo = this.eliminaTodo.bind(this);
	}
	controlaCambio(evento) {
		this.setState({ value: evento.target.value });
	}

	controlaSubmit(evento) {
		if (this.state.value.length > 0) {
			const nuevaTarea = this.state.tareas.slice();
			nuevaTarea.push(this.state.value);
			this.setState({ tareas: nuevaTarea });
			evento.preventDefault();
			this.setState({ value: "" });
			const todos = nuevaTarea.map(
				item => new Object({ label: item, done: false })
			);
			fetch("https://assets.breatheco.de/apis/fake/todos/user/tata", {
				method: "PUT",
				body: JSON.stringify(todos),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				})
				.then(data => {
					//here is were your code should start after the fetch finishes
					console.log(data); //this will print on the console the exact object received from the server
				})
				.catch(error => {
					//error handling
					console.log(error);
				});
		} else {
			evento.preventDefault();
		}
	}

	eliminaTarea(index) {
		let tareas = this.state.tareas.slice();
		tareas.splice(index, 1);
		this.setState({ tareas: tareas });
		const todos = tareas.map(
			item => new Object({ label: item, done: false })
		);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/tata", {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}

	eliminaTodo() {
		this.setState({ tareas: [] });
	}

	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/tata", {
			method: "GET"
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				this.setState({ tareas: data.map(index => index.label) }); //here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}

	render() {
		const contador = this.state.tareas.length;
		const tareasVacio = this.state.tareas.length > 0;

		return (
			<div className="container bg-light">
				<div className="row">
					<div className="col" />
					<div className="col-6">
						<div className="text-center mt-5">
							<h1>todos</h1>
							<br />
							<button
								type="button"
								className="btn btn-danger d-flex justify-content-start"
								onClick={this.eliminaTodo}>
								Borrar Todo
							</button>

							<br />
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

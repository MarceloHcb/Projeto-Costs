import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import { parse, v4 as uuidv4 } from "uuid";
import ServiceCard from "../service/ServiceCard";

export default function Project() {
  const { name } = useParams();  
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectform, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {    
      // fetch(`http://localhost:5000/projects/${id}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
        // .then((resp) => resp.json())
        // .then((data) => {
        const savedProjects = JSON.parse(localStorage.getItem("project"));
        const savedProject = savedProjects.filter((saved) => saved.name === name)
        console.log(savedProject);        
          setProject(savedProject[0]);
          setServices(savedProject[0].services);
          console.log(savedProject[0].services);
    //     })
    //     .catch((err) => console.log(err));
    
  }, [name]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectform);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function removeService(id, cost) {
    const sevicesUpdated = project.services.filter(
      (service) => service.id !== id
    );
    const projectUpdated = project;

    projectUpdated.services = sevicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);
    const savedProjectss = JSON.parse(localStorage.getItem("project"));
    const newServiceProject = savedProjectss.filter((saved) => saved.name !== name)
    localStorage.setItem("project", JSON.stringify([...newServiceProject, projectUpdated]));
    // fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(projectUpdated),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {

        setProject(projectUpdated);
        setServices(sevicesUpdated);
        setMessage("Serviço removido com sucesso!");
      // })
      // .catch((err) => console.log(err));
  }

  function createService() {
    setMessage("");
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);
    //maximum value validation

    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço");
      setType("error");
      project.services.pop();
      return false;
    }

    // add service cost to project total cost
    project.cost = newCost;
    //update project
    // fetch(`http://localhost:5000/projects/${project.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(project),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    const savedProjects = JSON.parse(localStorage.getItem("project"));
    const savedProject = savedProjects.filter((saved) => saved.name !== name)    
     localStorage.setItem("project", JSON.stringify([...savedProject, project]));
        setShowServiceForm(false);
      // })
      // .catch((err) => console.log(err));
  }

  function editPost(project) {
    setMessage("");
    
    // budget validation
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }
    // fetch(`http://localhost:5000/projects/${project.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(project),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setProject(data);
    console.log(project);
    const savedProjectss = JSON.parse(localStorage.getItem("project"));
    const newServiceProject = savedProjectss.filter((proj) => proj.name !== project.name)
    console.log(newServiceProject);
    localStorage.setItem("project", JSON.stringify([...newServiceProject, project]));
    
        setShowProjectForm(false);
        setMessage("Projeto atualizado!");
        setType("success");
      // })
      // .catch((err) => console.log(err));
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectform ? "Duplicar projeto" : "Fechar"}
              </button>
              {!showProjectform ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span> {project.category?.name}
                  </p>
                  <p>
                    <span>Total de Orçamento: </span> {project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado: </span> {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço</h2>
              <button onClick={toggleServiceForm} className={styles.btn}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

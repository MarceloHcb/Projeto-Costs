import React, { useState, useEffect } from "react";
import Message from "../layout/Message";
import { useLocation } from "react-router-dom";
import styles from "./Projects.module.css";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

export default function Projects() {
  const savadProjects = JSON.parse(localStorage.getItem("project"));
  const [projects, setProjects] = useState(savadProjects || []);
  console.log(projects);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");
  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      const savedProjectss = JSON.parse(localStorage.getItem("project"));
      if( savedProjectss){
        setProjects(savedProjectss);
      }
      setRemoveLoading(true);
      
      //   fetch("http://localhost:5000/projects", {
      //   method: 'GET',
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      // })
      // .then((resp) => resp.json())
      // .then((data) => {
      //   console.log(data);
      //   setProjects(data)
      //   setRemoveLoading(true)
      // })
      // .catch((err) =>  console.log(err))
    }, 300);
  }, []);

  function removeProject(name) {
    //   fetch(`http://localhost:5000/projects/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })
    // .then((resp) => resp.json())
    // .then(() =>{
    console.log(name);
    //  setProjects(projects.filter((project) => project.id !== id))
    console.log(projects);
    let newProjectsAfterDelect = projects.filter(
      (project) => project.name !== name
    );
    setProjects(newProjectsAfterDelect)
    console.log(newProjectsAfterDelect);
    localStorage.setItem("project", JSON.stringify(newProjectsAfterDelect));
     setProjectMessage('Projeto removido com sucesso!')
    // })
    // .catch(err => console.log(err))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newProject" text="Criar Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project, index) => (
            <ProjectCard
              name={project.name}
              id={index}
              budget={project.budget}
              services={project.services}
              category={project.category?.name}
              key={index}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

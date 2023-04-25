import ProjectForm from "../project/ProjectForm";
import styles from "./NewProjects.module.css";
import { useNavigate } from "react-router-dom";

export default function NewProjects() {
  const navigate = useNavigate();

  function createPost(project) {
    // initialize cost and services
    project.cost = 0;
    project.services = [];
    const savadProjects = JSON.parse(localStorage.getItem('project')) || []
   
    localStorage.setItem('project', JSON.stringify([...savadProjects,project]))

     console.log(savadProjects);
    // fetch("http://localhost:5000/projects", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(project),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     console.log(data);
    //        
    //   })
    //   .catch((err) => console.log(err));
     navigate('/projects', { state: { message: "Projeto criado com sucesso!!" } })   
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crir seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

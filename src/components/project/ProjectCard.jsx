import styles from "./ProjectCard.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ProjectCard({
  id,
  name,
  budget,
  category,
  services,
  handleRemove,
}) {
  const remove = (e) => {
    console.log(name);
    e.preventDefault();
    handleRemove(name);
  };

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R${budget}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[category]}`}></span> {category}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${name}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

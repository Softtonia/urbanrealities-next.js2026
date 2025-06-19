import styles from './AllProject.module.css';

const AllProjects = () => {
  const projectData = [
    { count: "145+", label: "Total Projects" },
    { count: "105+", label: "Ready to move" },
    { count: "40+", label: "Under Construction" },
  ];

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.heading}>All Projects</h5>
      {projectData.map((item, index) => (
        <div key={index} className={styles.card}>
          <div>
            <div className={styles.count}>{item.count}</div>
            <div className={styles.label}>{item.label}</div>
          </div>
          <div className={styles.visit}>Visit</div>
        </div>
      ))}
    </div>
  );
};

export default AllProjects;

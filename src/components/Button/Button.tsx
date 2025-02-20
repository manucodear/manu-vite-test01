import styles from './Button.module.css';

interface ButtonProps {
  // Define props here if needed
}

const Button: React.FC<ButtonProps> = () => {
  return (
    <div className={styles.container}>
      <h2>Button Component</h2>
    </div>
  );
};

export default Button;

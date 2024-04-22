import Card from './Card';
import classes from './enter.module.css';

function enter() {
  function submitHandler(event) {
    event.preventDefault();
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Prisoner's ID</label>
          <input type='number' required id='title' />
        </div>
        <div className={classes.actions}>
          <button>View</button>
        </div>
      </form>
    </Card>
  );
}

export default enter;
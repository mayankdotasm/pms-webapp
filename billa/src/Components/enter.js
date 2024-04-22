//import  {useRef} from 'react';
import Card from './Card';
import classes from './enter.module.css';



function enter() {
    //const titleInputRef= useRef(null);

    function submitHandler(event) {
        event.preventDefault();

    //const entertitle = titleInputRef.current.value;

    //const data = {
    //    title: entertitle,
    //};

    //console.log(data);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Prisoner's ID</label>
          <input type='number' required id='title'/>
        </div>
        <div className={classes.actions}>
          <button>View</button>
        </div>
      </form>
    </Card>
  );
}

export default enter;
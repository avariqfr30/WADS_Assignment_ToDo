import React, { useState, useRef, useEffect } from "react";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (assignment) => !assignment.completed,
  Completed: (assignment) => assignment.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [assignments, setassignments] = useState(props.assignments);
  const [filter, setFilter] = useState("All");

  function toggleassignmentCompleted(id) {
    const updatedassignments = assignments.map((assignment) => {
      // if this assignment has the same ID as the edited assignment
      if (id === assignment.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return { ...assignment, completed: !assignment.completed };
      }
      return assignment;
    });
    setassignments(updatedassignments);
  }

  const assignmentList = assignments
    .filter(FILTER_MAP[filter])
    .map((assignment) => (
      <Todo
        id={assignment.id}
        name={assignment.name}
        completed={assignment.completed}
        key={assignment.id}
        toggleassignmentCompleted={toggleassignmentCompleted}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const assignmentsNoun = assignmentList.length !== 1 ? "assignments" : "assignment";
  const headingText = `${assignmentList.length} ${assignmentsNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevassignmentLength = usePrevious(assignments.length);

  useEffect(() => {
    if (assignments.length - prevassignmentLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [assignments.length, prevassignmentLength]);

  return (
    <div className="todoapp stack-large">
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {assignmentList}
      </ul>
    </div>
  );
}

export default App;
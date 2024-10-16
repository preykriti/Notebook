import PropTypes from "prop-types";
const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      {/* {note.title}
    {note.description} */}
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
export default NoteItem;

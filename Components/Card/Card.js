// Card.js
const Card = ({ title, content, icon, link }) => {
  return (
    <a href={link}>
      <div className="card">
        <object className="card-icon" data={icon} type="image/svg+xml"></object>
        <h2 className="card-title">{title}</h2>
        <p className="card-content">{content}</p>
      </div>
    </a>
  );
};

export default Card;

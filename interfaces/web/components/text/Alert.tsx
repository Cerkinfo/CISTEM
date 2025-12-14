export const Alert_ = ({ color, title, description } : {color : string, title: string, description: any}) => {
    return (
        <div className={`alert alert-${color}`} role="alert">
        <h4 className="alert-heading">{title}</h4>
        <p style={{fontWeight:"100px", fontSize:"15px", opacity:"0.9"}}>{description}</p>
        </div>
    );
};
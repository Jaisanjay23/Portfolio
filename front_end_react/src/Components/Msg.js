import "../css/msg.css"

function Msg({msg}) {
  return (
    <div className="mhold">
        <b className="msg"><i className="fa-solid fa-circle-info"></i>{msg}</b>
    </div>
  );
}

export default Msg;

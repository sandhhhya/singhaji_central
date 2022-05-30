import React, { useState } from "react";
import avatar8 from "../assests/image/david.png";
import "./styles/HeaderDropdown.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actionDispatcher/auth/authDispatcher";
import { connect } from "react-redux";
import { Tooltip, Whisper } from "rsuite";
import SettingsModalFile from "./SettingsModalFile";

const AppHeaderDropdown = ({ userData, logout }) => {
  // const history = useHistory();
  const [show, setShow2] = useState(false)
  const navigate = useNavigate();
  const myname = localStorage.getItem("user");
  const userEmail = localStorage.getItem("email");


  const logoutfunction = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };


  return (
    <div>
      <Whisper placement="bottom" controlId="control-id-hover" trigger="hover" speaker={
        <Tooltip>
          View Profile
        </Tooltip>
      }>
        <img
          onClick={() => setShow2(!show)}
          src={avatar8} alt=""
          style={{
            height: "42px",
            width: "42px",
            margin: "10px",
            cursor: "pointer"
          }}
        />
      </Whisper>
      {
        show ?
          <div style={{ position: 'fixed', marginLeft: '-270px', marginTop: '10px' }}>
            <div style={{ flexDirection: 'column', backgroundColor: '#7e84a3', minHeight: '369px', width: '294px', alignItems: 'center', paddingTop: '49px', display: 'flex', flex: 'basis', zIndex: '510' }}>
              <img
                alt=""
                src={avatar8}
                style={{
                  height: "82px",
                  width: "82px",
                }}
              />
              <p style={{
                textAlign: 'center',
                color: 'white',
                fontSize: '11px'
              }}>
                <span style={{
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}>{myname}</span>
                <br /> {userEmail}</p>
              <hr style={{
                color: 'white',
                width: '294px',
                height: '1px',
                opacity: '1'
              }} />
                      
              <div style={{ marginTop: '-23px', cursor: 'pointer' }}>

                <span style={{
                  color: 'white',
                  fontWeight: '4px',
                  marginLeft: '8px'
                }}>
                  {/* Settings */}
                  <SettingsModalFile   setShow2={setShow2} />
                </span>
              </div>
              <hr style={{ color: 'white', width: '294px', height: '1px', opacity: '1' }} />
              <button
                style={{
                  marginTop: '10px',
                  outline: "1px solid white",
                  color: "white",
                  backgroundColor: "#7e84a3",
                  borderRadius: "4px",
                  border: "none",
                  height: "29px",
                  width: "110px",
                  fontSize: "13px"
                }}
                onClick={logoutfunction}
              >
                Log out
              </button>
            </div>
          </div>
          : ""
      }
    </div >
  );
};

//Getting the state from the store
const mapStateToProps = (state) => {
  return {
    userData: state.auth,
  };
};
//passing the userData in fetchUsers function and also dispatch method
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

//Connecting the component to our store
export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderDropdown);

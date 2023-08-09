import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { useEffect, useState, useRef } from "react";
import AlertCard from "./AlertCard";

export default function NotificationsContainer({ server }) {
  const [namespace, setNamespace] = React.useState("");
  const [showAlertPopup, setAlertPopup] = useState<boolean>(false);

  const handleChange = (event) => {
    setNamespace(event.target.value);
  };

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!server) return;
    const fetchData = () => {
      fetch(`http://${server}/api/v1/alerts`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("data from line 25: ", data);
          if (data.data.alerts.length !== 0) {
            setNotifications((prev) => [data]);
            setAlertPopup(true);
          } else {
            setAlertPopup(false);
          }
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [server]);

  const alertRef = useRef<HTMLDialogElement>(null);

  const showAlerts = (e) => {
    e.preventDefault();
    alertRef.current.showModal();
  };

  return (
    <>
      {showAlertPopup && (
        <div>
          <button className="btn btn-error" onClick={(e) => showAlerts(e)}>
            Alert
          </button>
          <dialog ref={alertRef} className="modal">
            <form method="dialog" className="modal-box">
              {notifications.map((notification) => (
                <AlertCard
                  alertname={notification.data.alerts[0].labels.alertname}
                  description={
                    notification.data.alerts[0].annotations.description
                  }
                  title={notification.data.alerts[0].annotations.title}
                  service={notification.data.alerts[0].labels.job}
                  severity={notification.data.alerts[0].labels.severity}
                  state={notification.data.alerts[0].state}
                  activeAt={notification.data.alerts[0].activeAt.toString()}
                  value={notification.data.alerts[0].value}
                  instance={notification.data.alerts[0].labels.instance}
                />
              ))}
              <div className="modal-action">
                <button
                  className="btn btn-error text-4xl h-12 w-12"
                  onClick={() => alertRef.current.close()}
                >
                  <i className="fa-solid fa-xmark fa-2xs"></i>
                </button>
              </div>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
  //   {/* {showAlertPopup && (
  //     <dialog id="my_modal_2" className="modal">
  //       <form method="dialog" className="modal-box">
  //         <h3 className="font-bold text-lg">Hello!</h3>

  //         {notifications.map((notification) => (
  //           <AlertCard
  //             alertname={notification.data.alerts[0].labels.alertname}
  //             description={
  //               notification.data.alerts[0].annotations.description
  //             }
  //             title={notification.data.alerts[0].annotations.title}
  //             service={notification.data.alerts[0].labels.job}
  //             severity={notification.data.alerts[0].labels.severity}
  //             state={notification.data.alerts[0].state}
  //             activeAt={notification.data.alerts[0].activeAt.toString()}
  //             value={notification.data.alerts[0].value}
  //             instance={notification.data.alerts[0].labels.instance}
  //           />
  //         ))}
  //       </form>
  //       <form method="dialog" className="modal-backdrop">
  //         <button>close</button>
  //       </form>
  //     </dialog>
  //   )} */}

  // // <div className="bg-slate-200">
  // //   {/* <h1 className="text-4xl text-center text-slate-200 font-serif">
  // //     Alerts Center
  // //   </h1> */}
  // //   {/* <div>
  // //     <Grid container spacing={2}>
  // //       <Grid item xs={2}>
  // //         <Box sx={{ minWidth: 120 }}>
  // //           <FormControl fullWidth>
  // //             <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
  // //             <Select
  // //               labelId="demo-simple-select-label"
  // //               id="demo-simple-select"
  // //               value={namespace}
  // //               label="sortBy"
  // //               onChange={handleChange}
  // //             >
  // //               <MenuItem value={10}>Alert Name</MenuItem>
  // //               <MenuItem value={20}>Namespace</MenuItem>
  // //               <MenuItem value={30}>Severity</MenuItem>
  // //             </Select>
  // //           </FormControl>
  // //           <br />
  // //           <br />
  // //         </Box>
  // //       </Grid>
  // //     </Grid>
  // //   </div> */}

  // // </div>
}

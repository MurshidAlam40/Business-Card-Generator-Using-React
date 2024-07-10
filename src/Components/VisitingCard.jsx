import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./VisitingCard.css";
import html2canvas from "html2canvas";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function VisitingCard() {
  //use state
  const [data, setData] = useState([]);

  //Download state
  const [selectedItem, setSelectedItem] = useState(null);

  //modal
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/users").then((res) => {
      setData(res.data);
    });
  }, [deleteCard]);

  const handleClose = () => setShow(false);

  const handleShow = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  //Download Function and state

  const handleDownload = (type) => {
    if (selectedItem) {
      const card = document.getElementById(`card-${selectedItem.id}`);

      if (type === "pdf") {
        const opt = {
          margin: 1,
          filename: `visiting-card-${selectedItem.name}.pdf`,
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().from(card).set(opt).save();
      }
      else if (type === "jpg") {
        html2canvas(card).then((canvas) => {
          const link = document.createElement("a");
          link.download = `visiting-card-${selectedItem.name}.jpg`;
          link.href = canvas.toDataURL("image/jpeg", 0.9);
          link.click();
        });
      }
    }
  };

  // delete card
  function deleteCard(index) {
    axios.delete(`http://localhost:8080/users/${index}`);
    // console.log(index);
  }

  return (
    <>
      <div className="visiting gradient-custom">
        <div className="container">
          <div className="d-flex align-items-end justify-content-end my-3">
            <Link to={"/"} className="btn btn-danger text-end">
              <i className="fas fa-undo px-2"></i>
              Back Home
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="row p-2">
            {data.map((item, key) => {
              return (
                <div className="col-lg-4 my-2" key={key}>
                  <div className="card-container" >
                    <div className="vcard front" id={`card-${item.id}`}>
                      <div className="card-content">
                        <h2>{item.name}</h2>
                        <p>{item.designation}</p>
                        <ul className="contact-info">
                          <li>
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            {item.address}
                          </li>
                          <li>
                            <i className="fas fa-phone"></i> {item.phone}
                          </li>
                          <li>
                            <i className="fas fa-envelope"></i> {item.email}
                          </li>
                        </ul>
                      </div>
                      <div className="card-logo bg-front-img">
                        {/*<img
                          src="https://www.chetu.com/img/chetu-logo-white.png"
                          alt="Company Logo"
                        />*/}
                        <p className="card-logo-text">{item.logo}</p>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between">
                    <button
                      className="btn mt-2"
                      style={{ backgroundColor: "#00b2b9", color: "white" }}
                      onClick={() => handleShow(item)}
                    >
                      <i className="fas fa-download"></i>
                    </button>
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => deleteCard(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Download Visiting Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-between py-5 mx-5">
            <Button
              style={{ backgroundColor: "#00b2b9", color: "white" }}
              onClick={() => handleDownload("pdf")}
            >
              Download as PDF
            </Button>
            <Button variant="primary" onClick={() => handleDownload("jpg")}>
              Download as JPG
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VisitingCard;

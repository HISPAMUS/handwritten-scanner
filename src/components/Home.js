import React from "react";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <div className="row px-3">
        <h4>Escáner de partituras manuscritas</h4>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <LinkContainer to="/scan">
            <Button variant="primary" size="lg" block>
              <i className="fas fa-scroll" />
              &nbsp;Copiar una partitura
            </Button>
          </LinkContainer>
        </div>
      </div>

      <Footer />
    </>
  );
}

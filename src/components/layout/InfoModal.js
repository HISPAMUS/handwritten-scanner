import React from "react";
import Modal from "react-bootstrap/Modal";

export default function InfoModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Escáner de partituras manuscritas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Información del proyecto</h5>
        <p className="text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          consectetur quis leo eu cursus. Curabitur sit amet augue nec sapien
          posuere sodales. Aenean at egestas massa, sed hendrerit libero. Sed
          malesuada imperdiet purus, sed commodo leo fermentum at. Suspendisse
          vehicula rutrum dolor. Quisque posuere ipsum elit, et volutpat ligula
          volutpat posuere. Fusce pulvinar eros vel purus congue, non hendrerit
          arcu hendrerit. Vestibulum id vestibulum nulla. Proin quam orci,
          dictum eleifend nunc in, sodales maximus turpis. Nullam pretium sit
          amet tellus ac facilisis. Donec in felis ligula. Fusce vestibulum
          lorem vitae lectus pharetra interdum. Etiam sed pharetra quam.
        </p>
        <h5>Instrucciones de uso</h5>
        <p className="text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          consectetur quis leo eu cursus. Curabitur sit amet augue nec sapien
          posuere sodales. Aenean at egestas massa, sed hendrerit libero. Sed
          malesuada imperdiet purus, sed commodo leo fermentum at. Suspendisse
          vehicula rutrum dolor. Quisque posuere ipsum elit, et volutpat ligula
          volutpat posuere. Fusce pulvinar eros vel purus congue, non hendrerit
          arcu hendrerit. Vestibulum id vestibulum nulla. Proin quam orci,
          dictum eleifend nunc in, sodales maximus turpis. Nullam pretium sit
          amet tellus ac facilisis. Donec in felis ligula. Fusce vestibulum
          lorem vitae lectus pharetra interdum. Etiam sed pharetra quam.
        </p>
      </Modal.Body>
    </Modal>
  );
}

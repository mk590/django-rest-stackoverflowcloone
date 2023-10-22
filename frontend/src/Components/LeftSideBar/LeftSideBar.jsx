import React from "react";
import {  Col, Card } from "react-bootstrap";
import "../RightSideBar/RightSideBar.css"
const LeftSideBar = () => {
  return (
    <Col sm={2} className="mt-3">
      <Card className="p-2 mb-3 rightColor">
        <h5>
          <strong>Hot Topics</strong> <hr />
        </h5>
        <p>NFT NON-FUNGIBLE TOKENS</p>
        <p>QUANT SELL PROFIT</p>
        <p>ML Still on Rise</p>
        <p>AI the next Future</p>
        <p>WEB 3 the Job Market</p>
      </Card>
      <Card className="p-2 mb-3 rightColor">
        <h5>
          <strong>Most Searched</strong> <hr />
        </h5>
        <p>DRF DJANGO-REST</p>
        <p>AWS WEB SERVICES </p>
        <p>GIT VERSION CONTROL </p>
        <p>HFT Money Making</p>
        <p>FAANG Dream Workplaces </p>
      </Card>
      <Card className="p-2 mb-3 rightColor">
        <h5>
          <strong> Coming Soon</strong> <hr />
        </h5>
        <p>AR Augmented Reality </p>
        <p>VR Virtual Reality </p>
        <p>3D-Printing  </p>
        <p>Genomics THE END </p>
        <p>AI-Images CHAT-GPT3 </p>
      </Card>
    </Col>
  );
};

export default LeftSideBar;
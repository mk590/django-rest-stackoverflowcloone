import React from "react";
import { Col, Card, Row } from "react-bootstrap";
import "./RightSideBar.css"
const RightSideBar = () => {
  return (
    <Col sm={2} className=" mt-3">
      <Card className="p-2  mb-3 rightColor">
        <h5 className="rightMainblock">The Overflow Blog </h5>
        <hr />
        <p>
          🖍 Observability is key to the future of software(ans DevOps career)
        </p>
        <p>🖍 Podcast 374. How valuable is your screen name</p>
        <p>🖍 Avoid pandemics. Go figure.</p>
        <p>🖍 You cannot “book learn” how to code.</p>
        <p>🖍 Recycling is important.</p>
      </Card>
      <Card className="p-2 mb-3 rightColor">
        <h5 className="rightMainblock">Note to the Authors </h5>
        <hr />
        <p>📌 Writing product: final writing outcome</p>
        <p>📌 Writing process: creative act of researching, composing</p>
        <p>📌 Author: writer of the writing product;</p>
        <p>📌 Sources: a place, person, or thing from which information</p>
        <p>📌 Audience: the readership of the writing product.</p>
      </Card>
      <Card className="p-2 rightColor">
        <h5 style={{align:"center"}}className="rightMainblock">Tags</h5>
        <br />
        <div className="parent">
          <div className="child mb-2">AWS</div>
          <div className="child mb-2">JWT</div>
          <div className="child mb-2">LTS</div>
        </div>
        <br />
        <div className="parent">
          <div className="child mb-2">DRF</div>
          <div className="child mb-2">GIT</div>
          <div className="child mb-2">GitHub</div>
        </div>
        <br />
        <div className="parent">
          <div className="child mb-2">GCP</div>
          <div className="child mb-2">win32</div>
          <div className="child mb-2">pip</div>
        </div>
      </Card>
    </Col>
  );
};

export default RightSideBar;

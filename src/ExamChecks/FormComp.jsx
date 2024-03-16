import React from 'react';
import AnsForm from '../Admin/AnsForm';

const EmbeddedForm = ({ embeddedFormLink, examTitle }) => (
    <div className="embedded-form">
        <div id="form-blur" className="form">
            <h2 className="title-heading">{examTitle}</h2>
            <iframe title={examTitle} className="form-link" src={embeddedFormLink + '?embedded=true'}>
                Form
            </iframe>
            {/* <AnsForm /> */}
            <div className="responsive-message">
                <h1>Please join via a Laptop/PC for the best performance</h1>
            </div>
        </div>
    </div>
);

export default EmbeddedForm;

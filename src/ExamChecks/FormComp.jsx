// import React from 'react';
// import AnsForm from '../Admin/AnsForm';

// const EmbeddedForm = ({ embeddedFormLink, examTitle , malpracticeAttempts}) => (
//     <div className="embedded-form">
//         <div id="form-blur" className="form">
//             <h2 className="title-heading">{examTitle}</h2>
//             <iframe title={examTitle} className="form-link" src={embeddedFormLink + '?embedded=true'}>
//                 Form
//             </iframe>
//             {/* <AnsForm /> */}
//             <div className="responsive-message">
//                 <h1>Please join via a Laptop/PC for the best performance</h1>
//             </div>
//         </div>
//     </div>
// );

// export default EmbeddedForm;

import React, { useRef, useEffect } from 'react';

const EmbeddedForm = ({ embeddedFormLink, examTitle, malpracticeAttempts }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        // Ensure iframeRef is available
        if (!iframeRef.current) return;

        // Send malpracticeAttempts value to the iframe
        iframeRef.current.contentWindow.postMessage({ malpracticeAttempts }, '*');
    }, [malpracticeAttempts]);

    return (
        <div className="embedded-form">
            <div id="form-blur" className="form">
                <h2 className="title-heading">{examTitle}</h2>
                <iframe title={examTitle} className="form-link" src={embeddedFormLink + '?embedded=true'} ref={iframeRef}>
                    Form
                </iframe>
                <div className="responsive-message">
                    <h1>Please join via a Laptop/PC for the best performance</h1>
                </div>
            </div>
        </div>
    );
};

export default EmbeddedForm;


import React from 'react';

const Visa = () => {
  const iframeStyle = {
    height: "315px"
  };
  const textCenter = {
    textAlign: "center"
  };

  return (
    <div>
      <div className="container">
        <br/>
        <h1 style={textCenter}>Visa Information</h1>

        <div className="row">
          <div className="col-md-4">
            <h2>F1 Visa</h2>
            <div className="mt-3">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe title="The F-1 Visa, Explained" className="embed-responsive-item" style={iframeStyle}
                        src="https://www.youtube.com/embed/eXY8YmpIZng?si=dAmRfbsHuSKIfc1-"
                        allowFullScreen></iframe>
              </div>
              <p className="lead">The F1 visa is a non-immigrant visa issued by the United States to international students who wish to pursue academic studies and language training programs within the U.S. This visa enables students to study at accredited U.S. institutions, including universities, colleges, high schools, and language training programs. Holders of the F1 visa are allowed to stay in the U.S. for the duration of their academic program, plus an additional 60 days to prepare for departure or to transfer to another program.</p>
            </div>
          </div>
          <div className="col-md-4">
            <h2>J1 Visa</h2>
            <div className="mt-3">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe title="The J-1 Visa, Explained" className="embed-responsive-item" style={iframeStyle}
                        src="https://www.youtube.com/embed/O123fOFs6rc?si=b7TfbF7dIDJTWyOy"
                        allowFullScreen></iframe>
              </div>
              <p className="lead">The J1 visa is a non-immigrant visa provided by the United States to individuals participating in exchange visitor programs that promote cultural exchange, especially to obtain medical or business training within the U.S. This visa category includes a wide range of participants, such as students, research scholars, professors, specialists, interns, and au pairs. The J1 visa aims to enhance understanding between the people of the United States and those of other countries through educational and cultural exchanges. Participants are encouraged to share their culture with Americans and to take their enriched understanding of the U.S. back to their home countries.</p>
            </div>
          </div>
          <div className="col-md-4">
            <h2>M1 Visa</h2>
            <div className="mt-3">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe title="The M-1 Visa, Explained" className="embed-responsive-item" style={iframeStyle}
                        src="https://www.youtube.com/embed/G7SQ106AkDo?si=Rnqiwf2_O8LabEyp"
                        allowFullScreen></iframe>
              </div>
              <p className="lead">The M1 visa is a non-immigrant visa issued by the United States specifically for students who wish to pursue vocational or non-academic studies within the U.S. Unlike the F1 visa, which is for academic studies, the M1 visa is tailored for those enrolled in technical and vocational programs. Students on an M1 visa are permitted to stay in the country for the full length of their vocational program plus an additional 30 days for departure, but the total stay cannot exceed one year unless granted an extension for medical reasons. The M1 visa emphasizes practical training and skill development in specific vocations or non-academic fields.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visa;




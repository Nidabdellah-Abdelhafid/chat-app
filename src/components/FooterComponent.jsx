import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render() {
        return (
            <div>
            {/* ======= Footer ======= */}
            <footer id="footer" className="footer">
                <div className="copyright">
                © Copyright <strong><span>Atlas Voyages</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                {/* All the links in the footer should remain intact. */}
                {/* You can delete the links only if you purchased the pro version. */}
                {/* Licensing information: https://bootstrapmade.com/license/ */}
                {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ */}
                
                </div>
            </footer>{/* End Footer */}
            </div>

        );
    }
}

export default FooterComponent;
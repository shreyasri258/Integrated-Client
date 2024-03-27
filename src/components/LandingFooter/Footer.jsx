import React from "react";
import {
    Box,
    FooterContainer,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./FooterStyles";
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const Footer = () => {
    return (
        <Box>
            
            
            <FooterContainer>
                <Row>
                    <Column>
                        <Heading>PROCTORPAL</Heading>
                        <p>Here you can create customized exam with proctoring system which ensures academic integrity through remote monitoring and surveillance during assessments. </p>
                    </Column>
                    
                    
                    <Column>
                        <Heading>CONTACT</Heading>
                        
                        <FooterLink href="#">
                        <HomeIcon />
                          <i className="fab fa-facebook-f">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    
                                    Narayanaguda, 500029
                                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <EmailIcon/>
                            <i className="fab fa-instagram">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    info@example.com
                                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <PhoneIcon/>
                            <i className="fab fa-twitter">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    + 91 - 888 999 3434
                                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <PhoneAndroidIcon/>
                            <i className="fab fa-youtube">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                   + 91 - 888 999 3433 
                                </span>
                            </i>
                        </FooterLink>
                    </Column>
                </Row>
            </FooterContainer>
        </Box>
    );
};
export default Footer;
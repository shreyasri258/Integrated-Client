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
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

 
const Footer = () => {
    return (
        <Box>
            
            <FooterContainer>
                <Row style={{ alignItems: "center" }}>
                    <Column>
                        <span style={{  marginBottom:"40px" }}>Get connected with us on social networks:</span>
                    </Column>
                    <Row style={{ display: "flex", alignItems: "center",marginBottom:"40px" }}>
                        <FacebookIcon style={{ marginRight: "5px" }} />
                        <XIcon style={{ marginRight: "5px" }} />
                        <InstagramIcon style={{ marginRight: "5px" }} />
                        <LinkedInIcon style={{ marginRight: "5px" }} />
                        <GitHubIcon style={{ marginRight: "5px" }} />
                        <GoogleIcon style={{ marginRight: "5px" }} />
                    </Row>
        
                </Row>
            </FooterContainer>
            <FooterContainer>
                <Row>
                    <Column>
                        <Heading>COMPANY NAME</Heading>
                        <p>Here you can use rows and columns to organize your footer content.Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </Column>
                    <Column>
                        <Heading>PRODUCTS</Heading>
                        <FooterLink href="#">
                            Angular
                        </FooterLink>
                        <FooterLink href="#">
                            React
                        </FooterLink>
                        <FooterLink href="#">
                            Vue
                        </FooterLink>
                        <FooterLink href="#">
                            Laravel
                        </FooterLink>
                    </Column>
                    <Column>
                        <Heading>USEFUL LINKS</Heading>
                        <FooterLink href="#">
                            Pricing
                        </FooterLink>
                        <FooterLink href="#">
                            Settings
                        </FooterLink>
                        <FooterLink href="#">
                            Orders
                        </FooterLink>
                        <FooterLink href="#">
                            Help
                        </FooterLink>
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
                                    
                                    New York, NY 10012, US
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
                                    + 01 234 567 88
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
                                    + 01 234 567 89
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
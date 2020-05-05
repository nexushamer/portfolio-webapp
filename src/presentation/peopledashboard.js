import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import './peopledashboard.css';
import annonimous from '../resources/img/anonimous.png';
import ProfileSummary from './widgets/profilesummary';
import ListTimeLine from './widgets/ListTimeLine';
import ProfileService from '../services/ProfileService';
import { properties } from '../config/properties';

function PeopleDashBoard() {
    const title = 'my work experience';
    const currentUser = 'steve.king@gmail.com';
    const [load, setLoad] = useState(0);
    let [profile, setProfile] = useState({
        tweets: [],
        profilePicture: annonimous,
        names: '',
        lastNames: '',
        experienceSummary: ''
    });
    const [show, setShow] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);
    const [pictureProfile, setPictureProfile] = useState(null);
    const [names, setNames] = useState(profile.names);
    const [lastNames, setLastNames] = useState(profile.lastNames);
    const [experienceSummary, setExperienceSummary] = useState(profile.experienceSummary);

    useEffect(() => {
        async function callEndpoint() {
            const response = await ProfileService.retrieveProfile(currentUser);

            if (typeof (response) !== "undefined" && response !== null) {
                let responseData = response.data;

                responseData.profilePicture = `${properties.wsEndpoint}/users/${currentUser}/profile/picture`;

                setProfile(response.data);
            }
        }

        callEndpoint();
    }, [load]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setPreviewFile(`${properties.wsEndpoint}/users/${currentUser}/profile/picture`);
        setNames(profile.names);
        setLastNames(profile.lastNames);
        setExperienceSummary(profile.experienceSummary);

        setShow(true);
    };

    function handleChange(event) {
        setPictureProfile(event.target.files[0]);
        setPreviewFile(URL.createObjectURL(event.target.files[0]));
    }

    function handleNamesChange(event) {
        const value = event.target.value;

        setNames(value);
    }

    function handleLastNamesChange(event) {
        const value = event.target.value;

        setLastNames(value);
    }

    function handleExperienceSummaryChange(event) {
        const value = event.target.value;

        setExperienceSummary(value);
    }

    async function handleUpdateProfile(event) {
        let isValid = true;
        if (names === '' || names === null) {
            alert('The Field name is required');
            isValid = false;
        }
        if (lastNames === '' || lastNames === null) {
            alert('The Field last Name is required');
            isValid = false;
        }
        if (experienceSummary === '' || experienceSummary === null) {
            alert('The Field experienceSummary is required');
            isValid = false;
        }

        if (isValid) {
            const profileToUpdate = {
                userId: currentUser,
                names: names,
                lastNames: lastNames,
                experienceSummary: experienceSummary,
                file: pictureProfile
            };

            const response = await ProfileService.updateProfile(profileToUpdate);
            console.log(response);
            if (response != null && response.status === 200) {
                if(profileToUpdate.file !== null) 
                    updateProfilePicture(profileToUpdate, function() {
                        handleClose();

                        setProfile({
                            tweets: profile.tweets,
                            profilePicture: `${profile.profilePicture}?${new Date().getTime()}`,
                            names: profileToUpdate.names,
                            lastNames: profileToUpdate.lastNames,
                            experienceSummary: profileToUpdate.experienceSummary
                        });
                    });
                else {
                    alert(response.data.description);
                    handleClose();
                }
            } else {
                alert(response.data.description);
            }
        } else
            return isValid;
    }

    async function updateProfilePicture(profile, concludeProcess) {
        const response = await ProfileService.updateProfilePicture(profile);
        console.log(response);
        if (response != null && response.status === 200) {
            alert(response.data.description);
            concludeProcess();
        } else {
            //alert(response.data.description);
        }
    }

    return (
        <Container>
            <Row>
                <Col md="2" ></Col>
                <Col md="8" className="containerGroup" >
                    <Row>
                        <Col style={{ textAlign: 'center' }} >
                            <Row style={{ paddingTop: '5px', paddingBottom: '20px' }} >
                                <Col>
                                    <img style={{ width: '200px', height: '220px', }} src={profile.profilePicture} alt="profile" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <ProfileSummary title={`${profile.names}'s timeline`}>
                                                <ListTimeLine lists={profile.tweets} />
                                            </ProfileSummary>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{ paddingTop: '5px', paddingBottom: '20px' }} >
                                <Col md="9" >
                                    <h2 style={{ textTransform: 'capitalize' }} >{`${profile.names} ${profile.lastNames}`}</h2>
                                </Col>
                                <Col md="3" ><Button variant="info" onClick={handleShow} >Edit</Button></Col>
                            </Row>
                            <Row>
                                <Col md="12" >
                                    <ProfileSummary title={title} >
                                        <p>{profile.experienceSummary}</p>
                                    </ProfileSummary>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col md="2" ></Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col md="4" >
                                <h6>Profile Image</h6>
                            </Col>
                            <Col md="8" ></Col>
                        </Row>
                        <Row>
                            <Col md="12" >
                                <img src={previewFile} alt="previewFile" />
                            </Col>
                        </Row>
                        <Row>
                            <Col><input type="file" onChange={handleChange} /></Col>
                        </Row>
                        <Row>
                            <Col md="4" >
                                <h6>Name</h6>
                            </Col>
                            <Col md="8" ></Col>
                        </Row>
                        <Row>
                            <Col md="12" >
                                <input type="text" value={names} onChange={handleNamesChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4" >
                                <h6>Last names</h6>
                            </Col>
                            <Col md="8" ></Col>
                        </Row>
                        <Row>
                            <Col md="12" >
                                <input type="text" value={lastNames} onChange={handleLastNamesChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="8" >
                                <h6>Experience summary</h6>
                            </Col>
                            <Col md="4" ></Col>
                        </Row>
                        <Row>
                            <Col md="12" >
                                <textarea rows={5} cols={25} onChange={handleExperienceSummaryChange} value={experienceSummary} ></textarea>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateProfile}>Update</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default PeopleDashBoard;
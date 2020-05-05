import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

function ProfileSummary(props) {
    const { title } = props;

    const style = {
        container: {
            background: 'white',
            paddingTop: '10',
            paddingBottom: '10',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#AAAAAA',
            borderRadius: 20,

        },
        titleText: {
            color: '#bfbcbb',
            textTransform:'capitalize',
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            borderBottomColor: '#AAAAAA',
            textAlign:'center'
        }
    };

    return (
        <Container style={{
            background:'white',
            paddingTop: '10px',
            paddingBottom: '10px',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#AAAAAA',
            borderRadius: 20,
            boxShadow: '4px 3px 2px #AAAAAA'
        }} >
            <Row>
                <Col>
                    <h3 style={style.titleText} >{title}</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    {props.children}
                </Col>
            </Row>
        </Container>
    );
}

ProfileSummary.propTypes = {
    title: PropTypes.string
};

export default ProfileSummary;
import React from 'react';
import PropTypes from 'prop-types';
import { Toast, Image, Row, Col } from 'react-bootstrap';
import annonimous from '../../resources/img/anonimous.png';

function ListTimeLine(props) {
    let { lists } = props;

    let listElements = lists.map((element) => {
        return (
            <li style={{ paddingTop: '10px',paddingBottom: '10px' }} key={element.id} >
                <Toast>
                    <Row>
                        <Col style={{ paddingTop: '5px', paddingLeft: '20px', paddingRight: '0px' }} md={3} >
                            <Image style={{ width: '80px', height: '80px' }} src={element.details.profileImageUrl || annonimous} thumbnail />
                        </Col>
                        <Col md={9} style={{ paddingLeft: '0px' }} >
                            <Toast.Header closeButton={false} >
                                <strong style={{ color:'#3a63d0', fontWeight: 'bold' }} className="mr-auto">{element.details.name}</strong>
                            </Toast.Header>
                            <Toast.Body style={{ color:'#6d86c8', fontSize: '12px', textAlign: 'justify' }} >
                                {element.text}
                            </Toast.Body>
                        </Col>
                    </Row>
                </Toast>
            </li>
        );
    });

    listElements = listElements.slice(1,6);

    return (
        <ul style={{
            listStyleType: 'none',
            paddingLeft: '0px',
            paddingRight: '0px',
        }} >{listElements}</ul>
    );
}

ListTimeLine.propTypes = {
    lists: PropTypes.array
};

export default ListTimeLine;
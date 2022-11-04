import React from 'react'
import { Popup, Card, Image, Rating } from 'semantic-ui-react'

const ContactPopup = (props) => (
    <Popup className={"contact"}
        trigger={
            <Card>
                <Card.Content>
                    <Card.Header>{props.name}</Card.Header>
                </Card.Content>
            </Card>
        }
        content={props.detail}
        inverted
    />
)

export default ContactPopup;

import React from 'react';

const styles = {
    card: {
        width: '350px',
        height: '400px',
        backgroundColor: 'white',
        border: '1px solid white',
        boxSizing: 'border-box',
        fontSize: '2.5em',
        color: 'white'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: '4px',
    }
}


function Card(props) {
    return(
        <div style={styles.card}>
            <img style={styles.image} src={props.card_number} />
        </div>
    )
}

export default Card;

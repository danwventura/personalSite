import React from 'react';
import Card from './CarouselCard';
import { GraphQLBoolean } from 'graphql';
import styled from 'styled-components';


const styles = {
    view_port: {
        // position: 'absolute',
        // marginTop: '75px',
        top: '50%',
        left: '50%',
        transform: 'translate(90%, -16%)',
        width: '350px',
        height: '400px',
        backgroundColor: 'black',
        overflow: 'hidden',
        borderRadius: '4px',
    },
    card_container : {
        display: 'flex',
        flexDirection: 'row',
        width: 'fit-content'
    },
    left_arrow : {
        fontWeight: 'bold',
        fontSize: '50px',
        cursor: 'pointer',
    },
    right_arrow : {
        fontWeight: 'bold',
        fontSize: '50px',
        cursor: 'pointer',
    }

}

const ArrowContainer = styled.div`
    display: flex;
    vertical-align: middle;
    transform: translate(0%, 185%);
`;

const ArrowDiv = styled.div`
    width: 40%;
`;

const SpacerDiv = styled.div`
    width: 25%;
`;


class HorizontalCarousel extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            current_card: 1
        }
    }

    componentDidMount() {
        let first_card_clone = this.card_container.children[0].cloneNode(true);
        let last_card_clone = this.card_container.children[this.card_container.children.length - 1].cloneNode(true);

        this.card_container.insertBefore(last_card_clone, this.card_container.children[0]);
        this.card_container.append(first_card_clone);
        this.card_container.style.transitionDuration = "0.0s";
        this.card_container.style.transform = `translate(-${350}px)`;
    }
    
    handle_previous = () => {
        if(this.state.current_card > 0) {
            let new_current_card = this.state.current_card - 1;
            this.setState({ current_card: new_current_card }, () => {
                this.card_container.style.transitionDuration = "0.5s";
                this.card_container.style.transform = `translate(-${350 * this.state.current_card}px)`;

                if(this.state.current_card === 0) {
                    setTimeout(() => {
                        this.card_container.style.transitionDuration = "0.0s";
                        this.card_container.style.transform = `translate(-${350 * (this.card_container.children.length - 2)}px)`;
                        this.setState({ current_card: this.card_container.children.length - 2});
                    }, 502);
                }
            })
        } else {
            return;
        }
    }

    handle_next = () => {
        if(this.state.current_card < this.card_container.children.length -1) {
            let new_current_card = this.state.current_card + 1;
            this.setState({ current_card: new_current_card }, () => {
                this.card_container.style.transitionDuration = "0.5s";
                this.card_container.style.transform = `translate(-${350 * this.state.current_card}px)`;

                if(this.state.current_card === this.card_container.children.length - 1) {
                    setTimeout(() => {
                        this.card_container.style.transitionDuration = "0.0s";
                        this.card_container.style.transform = `translate(-${350}px)`;
                        this.setState({ current_card: 1});
                    }, 502);
                }
            })
        } else {
            return;
        }
    }
    
    render() {
        return (
            <div>
                <ArrowContainer>
                    <ArrowDiv>
                        <a style={styles.left_arrow} onClick={this.handle_previous}>&laquo;</a>
                    </ArrowDiv>
                    <SpacerDiv />
                    <ArrowDiv>
                        <a style={styles.right_arrow} onClick={this.handle_next}>&raquo;</a>
                    </ArrowDiv>
                </ArrowContainer>
                <div className="view-port" style={styles.view_port}>
                    <div ref={ref_id => this.card_container = ref_id} className="card-container" style={styles.card_container}>
                            {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default HorizontalCarousel;
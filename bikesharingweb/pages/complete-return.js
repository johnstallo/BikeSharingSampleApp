import React, { Component } from 'react'
import Page from "../components/Page"
import Header from "../components/Header"
import Content from "../components/Content"
import Field from "../components/Field"
import FormNote from "../components/FormNote"
import FormButton from "../components/FormButton"
import Map from "../components/Map"
import Link from 'next/link'
import Footer from '../components/Footer'
import { withRouter } from 'next/router'
import MediaQuery from 'react-responsive'
import helpers from './helpers';
import Router from 'next/router'

export default class CompleteReturn extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            reservation: {},
            bike: {},
            invoice: {}
        };
    }

    async componentDidMount() {
        this.apiHost = await helpers.getApiHostAsync();
        var user = await helpers.verifyUserAsync(this.apiHost);
        if (!user) {
            Router.push('/signin');
            return;
        }

        // get reservation
        var state = "Completed";
        const reservation = await helpers.getReservationForUserAsync(user.id, this.apiHost, state);
        if (!reservation) {
            // Error, something's gone wrong, go home
            console.error("couldn't find " + state + " reservation, going to Index");
            Router.push("/");
            return;
        }

        // get bike
        const bike = await helpers.getBikeAsync(reservation.bikeId, this.apiHost);

        // get invoice
        const invoice = await helpers.getInvoiceAsync(reservation.invoiceId, this.apiHost);

        // set state
        this.setState({
            userId: user.id,
            reservation: reservation,
            bike: bike,
            invoice: invoice
        })
    }

    // handle return bike
    async handleClick(context) {
        // return bike
        console.log("completing return...");
       
        // navigate to review
        Router.push("/review");
    }

    render() {
        return (
            <Page>
                <Header cmd="back" />
                <Content>
                    <div className="details-container">
                        <Map />
                        <div className="title">You're returning a {this.state.bike.model}</div>
                        <Field label="Pick-up/return address" value={this.state.bike.address} />
                        <div className="row">
                            <div className="col">
                                <Field label="Price per hour" value={"$" + this.state.bike.hourlyCost} />
                                <FormNote text="Charging card ending with 1732" />
                            </div>
                            <div className="col">
                                <Field label="Total cost" value={"$" + this.state.invoice.amount} />
                            </div>
                        </div>
                        <MediaQuery minWidth={600}>
                            <div className="divider">
                                <FormButton primary url="/review" onClick={this.handleClick.bind(this)}>Confirm return</FormButton>
                            </div>
                        </MediaQuery>
                    </div>
                </Content>
                <MediaQuery maxWidth={600}>
                    <Footer>
                        <FormButton primary url="/review" onClick={this.handleClick.bind(this)}>Confirm return</FormButton>
                    </Footer>
                </MediaQuery>
                <style jsx>{`
            .divider {
                padding-top: 10px;
            }
            img {
                width: 100%;
                max-width: 400px;
            }
            .details-container {
                padding-top: 11px;
                letter-spacing: 0.5px;
            }
            .title {
                font-size: 18px;
                padding-top: 10px;
                letter-spacing: 1px;
                font-weight: 600;
            }
            .owner {
                font-size: 13px;
            }
        `}</style>
            </Page>
        )
    }

    }
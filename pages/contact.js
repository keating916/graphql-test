import React, { Component } from 'react'
import axios from 'axios';

import styles from '../styles/ContactForm.module.css'

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            contactEmail:"",
            contactPhone: "",
            address: "",
            comments: "",
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit(evt) {
        evt.preventDefault()
        let { fname, lname, contactEmail, contactPhone, address, comments } = this.state
        let params = {fname: fname, lname:lname, contactEmail:contactEmail, contactPhone:contactPhone, address:address, comments:comments}

        axios.post('http://localhost:3000/api/contactAPI', {params})
        .then(response => {
            if(response.data === 'OK') {
                this.setState({
                    ...this.state,
                    submitted: true,
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        let { fname, lname, contactEmail, contactPhone, address } = this.state

        let d = (fname !== "" && lname !== "" && contactEmail !== "" && contactPhone !== "" && address !== "") ? false : true
        if(!this.state.submitted) {
            return (
                <main className={styles.main}>
                    <div className={styles.textCenter}>
                        <h3>Quick Contact</h3>
                            <form className={styles.formContainer} action='none'>
                                <input className={styles.formControl} type="text" name="fname" placeholder="First Name" value={this.state.fname} onChange={this.handleChange} required />
                                <input className={styles.formControl} type="text" name="lname" placeholder="Last Name"  value={this.state.lname} onChange={this.handleChange}  required />
                                <input className={styles.formControl} type="email" name="contactEmail" placeholder="Email: you@yourdomain.com"  value={this.state.contactEmail} onChange={this.handleChange}  required />
                                <input className={styles.formControl} type="phone" name="contactPhone" placeholder="Phone: 111-111-1111"  value={this.state.contactPhone}  required onChange={this.handleChange}  />
                                <input className={styles.formControl} type="text" name="address" placeholder="Service Address"  value={this.state.address} onChange={this.handleChange}  required />
                                <textarea name="comments" className={styles.formControl} placeholder="Comments" id="contactTextArea"  value={this.state.comments } onChange={this.handleChange}  ></textarea>
                                <button className={styles.formControl} type="submit" id="formSubmitButton" disabled={d} onClick={evt => this.handleSubmit(evt)}>Submit</button>
                            </form>
                    </div>
                </main>
                
            )
        }else {
            return(
                <main className={styles.main}>
                    <div className={styles.textCenter}>Thank you, your contact form has been submitted!</div>
                </main>
            )
        }
    }
}
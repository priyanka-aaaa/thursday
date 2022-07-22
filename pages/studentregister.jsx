import React, { useState, useEffect } from "react";
import { Footer } from '../components/Footer';
import Header from '../components/Header';


import StudentRegisterForm from '../components/StudentRegisterForm';

import Link from 'next/link'
export default function Studentregister() {
    const [redirectToReferrer, setredirectToReferrer] = useState(false);
    useEffect(() => {
    
 if (localStorage.getItem('studentId')) {
        setredirectToReferrer(true)
    }
}, [])
   
  return (
        <div className="main-content">
            <div className="full-width-header">
                <Header />
                <section className="Form-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <img src="/images/login.webp" alt="login" loading="lazy"/>
                            </div>
                            <div className="col-lg-6">
                                <StudentRegisterForm />
                            </div>
                        </div>
                    </div>

                </section>
            </div>
            <Footer />
        </div>
    );
}
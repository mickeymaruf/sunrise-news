import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <div>
            <Link to="/signup"><FaArrowLeft /> Back to Signup Page</Link>
            <h2 className='mt-2'>Terms and Conditions.</h2>
            <code>
                Welcome to Sunrise News <br />

                These terms and conditions outline the rules and regulations for the use of Sunrise News's Website, located at Website.com.<br />

                By accessing this website we assume you accept these terms and conditions. Do not continue to use Sunrise News if you do not agree to take all of the terms and conditions stated on this page.<br />

                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.<br /><br />

                Cookies
                We employ the use of cookies. By accessing Sunrise News, you agreed to use cookies in agreement with the Sunrise News's Privacy Policy.<br />

                Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                <br /><br />
                License
                Unless otherwise stated, Sunrise News and/or its licensors own the intellectual property rights for all material on Sunrise News. All intellectual property rights are reserved. You may access this from Sunrise News for your own personal use subjected to restrictions set in these terms and conditions.
            </code>
        </div>
    );
};

export default Terms;